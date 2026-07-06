"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
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
  new: { label: "Nouveau", variant: "success" as const },
  read: { label: "Lu", variant: "primary" as const },
  replied: { label: "Répondu", variant: "neutral" as const },
};

const statusNext: Record<ContactRequest["status"], ContactRequest["status"]> =
  { new: "read", read: "replied", replied: "new" };

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

  const cycleStatus = async (demand: ContactRequest) => {
    const next = statusNext[demand.status];
    await supabase
      .from("contact_requests")
      .update({ status: next })
      .eq("id", demand.id);
    setDemands((prev) =>
      prev.map((d) => (d.id === demand.id ? { ...d, status: next } : d))
    );
  };

  const newCount = demands.filter((d) => d.status === "new").length;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-dark">
          Demandes de contact
        </h1>
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
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-neutral text-sm">
              Chargement…
            </div>
          ) : demands.length === 0 ? (
            <div className="p-8 text-center text-neutral text-sm">
              Aucune demande pour l&apos;instant.
            </div>
          ) : (
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {demands.map((demand) => {
                  const status = statusMap[demand.status];
                  const isExpanded = expanded === demand.id;
                  return (
                    <>
                      <tr
                        key={demand.id}
                        className={`hover:bg-gray-50 cursor-pointer ${demand.status === "new" ? "bg-green-50/40" : ""}`}
                        onClick={() =>
                          setExpanded(isExpanded ? null : demand.id)
                        }
                      >
                        <td className="px-5 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              cycleStatus(demand);
                            }}
                            title="Changer le statut"
                          >
                            <Badge variant={status.variant}>
                              {status.label}
                            </Badge>
                          </button>
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
                      </tr>
                      {isExpanded && (
                        <tr key={`${demand.id}-expand`} className="bg-gray-50">
                          <td colSpan={5} className="px-5 py-4">
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
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
