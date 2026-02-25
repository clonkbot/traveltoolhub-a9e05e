import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const leads = useQuery(api.leads.listAll, { passcode: isUnlocked ? passcode : "" });
  const csvData = useQuery(api.leads.exportCSV, { passcode: isUnlocked ? passcode : "" });

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocked(true);
  };

  const handleExportCSV = () => {
    if (!csvData) return;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isUnlocked) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleUnlock} className="glass-card p-6 space-y-4">
          <p className="text-gray-400 text-sm">Enter admin passcode to view leads</p>
          <input
            type="password"
            placeholder="Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F9E94]/50"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium bg-[#1F9E94] text-white hover:bg-[#1F9E94]/90 transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Email Leads</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={!csvData}
            className="px-4 py-2 bg-[#1F9E94]/20 text-[#1F9E94] rounded-xl hover:bg-[#1F9E94]/30 transition-colors text-sm font-medium disabled:opacity-50"
          >
            Export CSV
          </button>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back
          </button>
        </div>
      </div>

      {leads === undefined ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#1F9E94] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : leads.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <p className="text-gray-400">No leads yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">{leads.length} total leads</p>
          {leads.map((lead: { _id: string; email: string; createdAt: number; country: string; lifestyle: string; stayLength: number; totalCost: number }) => (
            <div key={lead._id} className="glass-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{lead.email}</span>
                <span className="text-gray-500 text-xs">
                  {new Date(lead.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-white/10 rounded text-gray-300">
                  {lead.country}
                </span>
                <span className="px-2 py-1 bg-white/10 rounded text-gray-300">
                  {lead.lifestyle}
                </span>
                <span className="px-2 py-1 bg-white/10 rounded text-gray-300">
                  {lead.stayLength}mo
                </span>
                <span className="px-2 py-1 bg-[#1F9E94]/20 rounded text-[#1F9E94]">
                  ${lead.totalCost}/mo
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
