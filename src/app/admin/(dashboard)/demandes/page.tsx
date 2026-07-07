"use client";

import { Fragment, useEffect, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import SelectMenu from "@/components/ui/SelectMenu";
import { createClient } from "@/lib/supabase";

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

const statusMap = {
  new: { label: "Nouveau", classes: "bg-green-100 text-green-700" },
  read: { label: "Lu", classes: "bg-blue-100 text-blue-700" },
  replied: { label: "Répondu", classes: "bg-gray-100 text-gray-600" },
};

const STATUSES = Object.keys(statusMap) as ContactRequest["status"][];

export default function AdminDemandesPage() {
  const [demands, setDemands] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchDemands = async () => {
      const { data } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setDemands(data);
      setLoading(false);
    };
    fetchDemands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStatus = async (
    demand: ContactRequest,
    status: ContactRequest["status"]
  ) => {
    const { error } = await supabase
      .from("contact_requests")
      .update({ status })
      .eq("id", demand.id);
    if (error) {
      alert("Impossible de changer le statut. Réessayez.");
      return;
    }
    setDemands((prev) =>
      prev.map((d) => (d.id === demand.id ? { ...d, status } : d))
    );
  };

  const deleteDemand = async (demand: ContactRequest) => {
    if (!confirm(`Supprimer définitivement la demande de ${demand.name} ?`))
      return;
    const { error } = await supabase
      .from("contact_requests")
      .delete()
      .eq("id", demand.id);
    if (error) {
      alert("Impossible de supprimer la demande. Réessayez.");
      return;
    }
    setDemands((prev) => prev.filter((d) => d.id !== demand.id));
  };

  const StatusSelect = ({ demand }: { demand: ContactRequest }) => (
    <SelectMenu
      value={demand.status}
      options={STATUSES.map((s) => ({ value: s, label: statusMap[s].label }))}
      onChange={(v) => setStatus(demand, v as ContactRequest["status"])}
      buttonClassName={`text-xs font-medium rounded-full px-2.5 py-1 ${statusMap[demand.status].classes}`}
    />
  );

  const newCount = demands.filter((d) => d.status === "new").length;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <p className="text-xl sm:text-2xl font-bold text-neutral-dark">
          Demandes de contact
        </p>
        <p className="text-sm text-neutral mt-1">
          {demands.length} demande{demands.length !== 1 ? "s" : ""} -{" "}
          {newCount > 0 ? (
            <span className="text-green-600 font-medium">
              {newCount} nouvelle{newCount > 1 ? "s" : ""}
            </span>
          ) : (
            "toutes traitées"
          )}
        </p>
      </div>

      <Card hover={false} className="overflow-hidden p-0">
        {loading ? (
          <div className="p-8 text-center text-neutral text-sm">
            Chargement…
          </div>
        ) : demands.length === 0 ? (
          <div className="p-8 text-center text-neutral text-sm">
            Aucune demande pour l&apos;instant.
          </div>
        ) : (
          <>
            {/* Liste mobile */}
            <div className="md:hidden divide-y divide-gray-100">
              {demands.map((demand) => {
                const isExpanded = expanded === demand.id;
                return (
                  <div
                    key={demand.id}
                    className={`p-4 ${demand.status === "new" ? "bg-green-50/40" : ""}`}
                  >
                    <div
                      className="flex items-start justify-between gap-3 cursor-pointer"
                      onClick={() => setExpanded(isExpanded ? null : demand.id)}
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-dark text-sm truncate">
                          {demand.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDate(demand.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusSelect demand={demand} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDemand(demand);
                          }}
                          title="Supprimer"
                          className="p-1.5 rounded hover:bg-red-50 transition-colors text-red-400"
                        >
                          <Trash2 size={15} />
                        </button>
                        <ChevronDown
                          size={16}
                          className={`text-neutral transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                    <p
                      className={`text-sm text-neutral leading-relaxed mt-2 ${isExpanded ? "whitespace-pre-wrap" : "line-clamp-2"}`}
                      onClick={() => setExpanded(isExpanded ? null : demand.id)}
                    >
                      {demand.message}
                    </p>
                    {isExpanded && (
                      <div className="flex flex-col gap-1 mt-3 text-xs text-gray-400 break-all">
                        <span>Email : {demand.email}</span>
                        {demand.phone && <span>Tél : {demand.phone}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tableau desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Statut
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Nom
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Contact
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Message
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-neutral">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {demands.map((demand) => {
                  const isExpanded = expanded === demand.id;
                  return (
                    <Fragment key={demand.id}>
                      <tr
                        className={`hover:bg-gray-50 cursor-pointer ${demand.status === "new" ? "bg-green-50/40" : ""}`}
                        onClick={() =>
                          setExpanded(isExpanded ? null : demand.id)
                        }
                      >
                        <td className="px-5 py-4">
                          <StatusSelect demand={demand} />
                        </td>
                        <td className="px-5 py-4 font-medium text-neutral-dark whitespace-nowrap">
                          {demand.name}
                        </td>
                        <td className="px-5 py-4 text-neutral">
                          <div className="text-xs">{demand.email}</div>
                          {demand.phone && (
                            <div className="text-xs text-gray-400">
                              {demand.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4 text-neutral max-w-xs truncate">
                          {demand.message}
                        </td>
                        <td className="px-5 py-4 text-neutral whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {formatDate(demand.created_at)}
                            <ChevronDown
                              size={14}
                              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDemand(demand);
                            }}
                            title="Supprimer"
                            className="p-1.5 rounded hover:bg-red-50 transition-colors text-red-400"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="max-w-2xl">
                              <p className="text-xs font-medium text-neutral mb-1">
                                Message complet
                              </p>
                              <p className="text-sm text-neutral-dark leading-relaxed whitespace-pre-wrap">
                                {demand.message}
                              </p>
                              <div className="flex gap-4 mt-3 text-xs text-gray-400">
                                <span>Email : {demand.email}</span>
                                {demand.phone && (
                                  <span>Tél : {demand.phone}</span>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
