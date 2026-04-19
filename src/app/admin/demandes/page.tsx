"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { fakeDemands } from "@/data/fake-admin-data";

const statusMap = {
  new: { label: "Nouveau", variant: "success" as const },
  read: { label: "Lu", variant: "primary" as const },
  replied: { label: "Répondu", variant: "neutral" as const },
};

export default function AdminDemandesPage() {
  const newCount = fakeDemands.filter((d) => d.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#000" }}>Demandes de contact</h1>
          <p className="text-sm text-neutral mt-1">
            {fakeDemands.length} demandes - {newCount} nouvelle{newCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <Card hover={false} className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 font-medium text-neutral">Statut</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Nom</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Email</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Téléphone</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Message</th>
                <th className="text-left px-6 py-3 font-medium text-neutral">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fakeDemands.map((demand) => {
                const status = statusMap[demand.status];
                return (
                  <tr key={demand.id} className={`hover:bg-gray-50 ${demand.status === "new" ? "bg-green-50/30" : ""}`}>
                    <td className="px-6 py-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-dark whitespace-nowrap">
                      {demand.name}
                    </td>
                    <td className="px-6 py-4 text-neutral">{demand.email}</td>
                    <td className="px-6 py-4 text-neutral whitespace-nowrap">{demand.phone}</td>
                    <td className="px-6 py-4 text-neutral max-w-xs truncate">{demand.message}</td>
                    <td className="px-6 py-4 text-neutral whitespace-nowrap">{demand.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
