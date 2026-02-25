import { useState } from "react";
import { useMutation } from "convex/react";
import { useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { countries } from "../data/costs";
import type { Lifestyle, HousingType, TravelerType, WorkStyle } from "../data/costs";
import { LeadCaptureModal } from "./LeadCaptureModal";

interface ResultsProps {
  data: {
    country: string;
    city: string;
    lifestyle: Lifestyle;
    stayLength: number;
    housingType: HousingType;
    travelerType: TravelerType;
    workStyle: WorkStyle;
    total: number;
    breakdown: {
      rent: number;
      food: number;
      transport: number;
      utilities: number;
      internet: number;
      health: number;
      fun: number;
    };
    confidence: "low" | "medium" | "high";
  };
  onBack: () => void;
  onCompare: () => void;
}

const breakdownIcons: Record<string, string> = {
  rent: "🏠",
  food: "🍜",
  transport: "🚌",
  utilities: "💡",
  internet: "📶",
  health: "🏥",
  fun: "🎉",
};

const breakdownLabels: Record<string, string> = {
  rent: "Rent",
  food: "Food & Groceries",
  transport: "Transport",
  utilities: "Utilities",
  internet: "Internet & SIM",
  health: "Health & Insurance",
  fun: "Fun & Misc",
};

export function Results({ data, onBack, onCompare }: ResultsProps) {
  const { isAuthenticated } = useConvexAuth();
  const savePlan = useMutation(api.plans.save);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const countryData = countries.find((c) => c.value === data.country);
  const countryName = countryData?.label || data.country;
  const countryFlag = countryData?.flag || "🌍";

  const confidenceColors = {
    low: "text-amber-400",
    medium: "text-yellow-400",
    high: "text-emerald-400",
  };

  const confidenceBgColors = {
    low: "bg-amber-400/20",
    medium: "bg-yellow-400/20",
    high: "bg-emerald-400/20",
  };

  const handleSave = async () => {
    if (!isAuthenticated || saving) return;
    setSaving(true);
    try {
      await savePlan({
        country: data.country,
        city: data.city || undefined,
        lifestyle: data.lifestyle,
        stayLength: data.stayLength,
        housingType: data.housingType,
        travelerType: data.travelerType,
        workStyle: data.workStyle,
        totalCost: data.total,
        breakdown: data.breakdown,
      });
      setSaved(true);
    } catch (error) {
      console.error("Failed to save plan:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-5xl mb-3">{countryFlag}</div>
        <h2 className="text-2xl font-bold text-white">
          {countryName}{data.city ? `, ${data.city}` : ""}
        </h2>
        <p className="text-gray-400 text-sm">
          {data.stayLength} {data.stayLength === 1 ? "month" : "months"} • {data.lifestyle} • {data.travelerType} • {data.workStyle}
        </p>
      </div>

      {/* Total Cost */}
      <div className="glass-card p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F9E94]/20 to-transparent"></div>
        <div className="relative">
          <p className="text-gray-400 text-sm mb-1">Estimated Monthly Cost</p>
          <p className="text-5xl font-bold text-white mb-2">
            ${data.total.toLocaleString()}
          </p>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${confidenceBgColors[data.confidence]}`}>
            <span className={confidenceColors[data.confidence]}>●</span>
            <span className={confidenceColors[data.confidence]}>
              {data.confidence.charAt(0).toUpperCase() + data.confidence.slice(1)} confidence
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Cost Breakdown</h3>
        <div className="space-y-2">
          {Object.entries(data.breakdown).map(([key, value]) => (
            <div key={key} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{breakdownIcons[key]}</span>
                <span className="text-gray-300">{breakdownLabels[key]}</span>
              </div>
              <span className="text-white font-semibold">${value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main CTA */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-[#1F9E94] to-[#14b8a6] text-white shadow-lg shadow-[#1F9E94]/40 hover:shadow-xl hover:shadow-[#1F9E94]/50 active:scale-[0.98] transition-all"
      >
        Download Full Relocation Plan (PDF)
      </button>

      {/* Secondary CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCompare}
          className="glass-card py-3 px-4 text-gray-300 hover:bg-white/10 transition-all text-sm font-medium"
        >
          Compare Another
        </button>
        <button
          onClick={handleSave}
          disabled={!isAuthenticated || saved || saving}
          className={`glass-card py-3 px-4 transition-all text-sm font-medium ${
            saved
              ? "text-emerald-400 border-emerald-400/30"
              : !isAuthenticated
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-300 hover:bg-white/10"
          }`}
        >
          {saving ? "Saving..." : saved ? "✓ Saved" : "Save This Plan"}
        </button>
      </div>

      {/* Affiliate Section */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h4 className="text-sm font-medium text-gray-400">
          Recommended travel tools for your move
        </h4>
        <div className="space-y-2">
          <a
            href={`https://traveltoolhub.com/compare/esim-providers?country=${data.country}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-3 flex items-center gap-3 hover:bg-white/10 transition-all group"
          >
            <span className="text-xl">📱</span>
            <span className="text-gray-300 group-hover:text-white transition-colors flex-1">
              Best eSIMs for {countryName}
            </span>
            <svg className="w-4 h-4 text-gray-500 group-hover:text-[#1F9E94] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://traveltoolhub.com/compare/vpn-providers"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-3 flex items-center gap-3 hover:bg-white/10 transition-all group"
          >
            <span className="text-xl">🔒</span>
            <span className="text-gray-300 group-hover:text-white transition-colors flex-1">
              Best VPNs for booking savings
            </span>
            <svg className="w-4 h-4 text-gray-500 group-hover:text-[#1F9E94] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://traveltoolhub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-3 flex items-center gap-3 hover:bg-white/10 transition-all group"
          >
            <span className="text-xl">✈️</span>
            <span className="text-gray-300 group-hover:text-white transition-colors flex-1">
              Compare flight prices
            </span>
            <svg className="w-4 h-4 text-gray-500 group-hover:text-[#1F9E94] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
      >
        ← Start Over
      </button>

      {/* Lead Capture Modal */}
      {showModal && (
        <LeadCaptureModal
          data={data}
          countryName={countryName}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
