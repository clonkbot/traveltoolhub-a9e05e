import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Lifestyle, HousingType, TravelerType, WorkStyle } from "../data/costs";

interface LeadCaptureModalProps {
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
  };
  countryName: string;
  onClose: () => void;
}

export function LeadCaptureModal({ data, countryName, onClose }: LeadCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitLead = useMutation(api.leads.submit);

  const getDeviceId = () => {
    let deviceId = localStorage.getItem("tth_device_id");
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem("tth_device_id", deviceId);
    }
    return deviceId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await submitLead({
        email,
        consent,
        country: data.country,
        city: data.city || undefined,
        lifestyle: data.lifestyle,
        stayLength: data.stayLength,
        housingType: data.housingType,
        travelerType: data.travelerType,
        workStyle: data.workStyle,
        totalCost: data.total,
        breakdown: JSON.stringify(data.breakdown),
        deviceId: getDeviceId(),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="glass-card max-w-md w-full p-6 space-y-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#1F9E94]/20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-[#1F9E94]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">You're all set!</h3>
            <p className="text-gray-400 text-sm">
              Your personalized relocation plan for {countryName} is ready.
            </p>
          </div>

          <button
            onClick={() => {
              // In a real app, this would trigger a PDF download
              alert("PDF download would start here! In production, this generates a real PDF.");
            }}
            className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-[#1F9E94] to-[#14b8a6] text-white shadow-lg shadow-[#1F9E94]/40 hover:shadow-xl transition-all"
          >
            Download PDF
          </button>

          <a
            href="https://traveltoolhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-[#1F9E94] hover:text-[#14b8a6] transition-colors text-sm"
          >
            Open TravelToolHub →
          </a>

          <button
            onClick={onClose}
            className="w-full py-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-card max-w-md w-full p-6 space-y-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-white">Get Your Relocation Plan</h3>
          <p className="text-gray-400 text-sm">
            Enter your email to receive a detailed PDF guide for moving to {countryName}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F9E94]/50 focus:border-transparent"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 transition-all ${
                consent
                  ? "bg-[#1F9E94] border-[#1F9E94]"
                  : "border-gray-500 group-hover:border-gray-400"
              }`}>
                {consent && (
                  <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-400 leading-tight">
              I agree to receive the relocation plan and occasional travel tool updates.
            </span>
          </label>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={!email || !consent || submitting}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${
              email && consent && !submitting
                ? "bg-gradient-to-r from-[#1F9E94] to-[#14b8a6] text-white shadow-lg shadow-[#1F9E94]/40 hover:shadow-xl"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            {submitting ? "Sending..." : "Get My Plan"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Read our{" "}
          <button onClick={() => alert("Privacy policy page coming soon!")} className="text-[#1F9E94] hover:underline">
            Privacy Policy
          </button>
        </p>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
