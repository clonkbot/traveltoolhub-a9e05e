import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { countries } from "../data/costs";
import type { Id } from "../../convex/_generated/dataModel";

interface SavedPlansProps {
  onSelect: (plan: {
    country: string;
    city: string;
    lifestyle: string;
    stayLength: number;
    housingType: string;
    travelerType: string;
    workStyle: string;
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
  }) => void;
  onBack: () => void;
}

export function SavedPlans({ onSelect, onBack }: SavedPlansProps) {
  const plans = useQuery(api.plans.list);
  const removePlan = useMutation(api.plans.remove);

  const handleDelete = async (id: Id<"savedPlans">, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this saved plan?")) {
      await removePlan({ id });
    }
  };

  const getCountryInfo = (countryKey: string) => {
    const country = countries.find((c) => c.value === countryKey);
    return country || { label: countryKey, flag: "🌍" };
  };

  if (plans === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#1F9E94] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Saved Plans</h2>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          ← Back
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="glass-card p-8 text-center space-y-4">
          <div className="text-4xl">📋</div>
          <p className="text-gray-400">No saved plans yet</p>
          <p className="text-gray-500 text-sm">
            Calculate costs for a destination and save it for later!
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F9E94]/20 text-[#1F9E94] rounded-xl hover:bg-[#1F9E94]/30 transition-colors"
          >
            Start Calculating
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan: { _id: Id<"savedPlans">; country: string; city?: string; lifestyle: string; stayLength: number; housingType: string; travelerType: string; workStyle: string; totalCost: number; breakdown: { rent: number; food: number; transport: number; utilities: number; internet: number; health: number; fun: number }; createdAt: number }) => {
            const countryInfo = getCountryInfo(plan.country);
            const date = new Date(plan.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={plan._id}
                onClick={() =>
                  onSelect({
                    country: plan.country,
                    city: plan.city || "",
                    lifestyle: plan.lifestyle,
                    stayLength: plan.stayLength,
                    housingType: plan.housingType,
                    travelerType: plan.travelerType,
                    workStyle: plan.workStyle,
                    total: plan.totalCost,
                    breakdown: plan.breakdown,
                    confidence: "medium",
                  })
                }
                className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{countryInfo.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">
                      {countryInfo.label}
                      {plan.city && `, ${plan.city}`}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {plan.lifestyle} • {plan.stayLength}mo • {plan.travelerType}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#1F9E94] font-bold text-lg">
                      ${plan.totalCost.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-xs">/month</p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(plan._id, e)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
