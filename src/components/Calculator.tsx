import { useState } from "react";
import { countries, calculateCosts, type Lifestyle, type HousingType, type TravelerType, type WorkStyle } from "../data/costs";

interface CalculatorProps {
  onCalculate: (result: {
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
  }) => void;
}

export function Calculator({ onCalculate }: CalculatorProps) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("comfortable");
  const [stayLength, setStayLength] = useState(3);
  const [housingType, setHousingType] = useState<HousingType>("studio");
  const [travelerType, setTravelerType] = useState<TravelerType>("solo");
  const [workStyle, setWorkStyle] = useState<WorkStyle>("remote");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCountries = countries.filter((c) =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCountry = countries.find((c) => c.value === country);

  const handleCalculate = () => {
    if (!country) return;

    const { total, breakdown, confidence } = calculateCosts(
      country,
      lifestyle,
      stayLength,
      housingType,
      travelerType,
      workStyle
    );

    onCalculate({
      country,
      city,
      lifestyle,
      stayLength,
      housingType,
      travelerType,
      workStyle,
      total,
      breakdown,
      confidence,
    });
  };

  return (
    <div className="space-y-6">
      {/* Country Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Destination Country <span className="text-[#1F9E94]">*</span>
        </label>
        <div className="relative">
          <div
            className="glass-card px-4 py-3 cursor-pointer flex items-center justify-between"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedCountry ? (
              <span className="flex items-center gap-2">
                <span className="text-xl">{selectedCountry.flag}</span>
                <span>{selectedCountry.label}</span>
              </span>
            ) : (
              <span className="text-gray-500">Select a country...</span>
            )}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {showDropdown && (
            <div className="absolute z-50 w-full mt-2 glass-card overflow-hidden">
              <input
                type="text"
                placeholder="Search countries..."
                className="w-full px-4 py-3 bg-transparent border-b border-white/10 text-white placeholder-gray-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <div className="max-h-48 overflow-y-auto">
                {filteredCountries.map((c) => (
                  <div
                    key={c.value}
                    className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-2 transition-colors"
                    onClick={() => {
                      setCountry(c.value);
                      setShowDropdown(false);
                      setSearchQuery("");
                    }}
                  >
                    <span className="text-xl">{c.flag}</span>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">City (optional)</label>
        <input
          type="text"
          placeholder="e.g., Bangkok, Lisbon, Mexico City"
          className="glass-card w-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F9E94]/50"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Lifestyle */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Lifestyle</label>
        <div className="grid grid-cols-3 gap-2">
          {(["budget", "comfortable", "premium"] as Lifestyle[]).map((l) => (
            <button
              key={l}
              className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                lifestyle === l
                  ? "bg-[#1F9E94] text-white shadow-lg shadow-[#1F9E94]/30"
                  : "glass-card text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setLifestyle(l)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stay Length */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-300">Stay Length</label>
          <span className="text-[#1F9E94] font-bold text-lg">{stayLength} {stayLength === 1 ? "month" : "months"}</span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          value={stayLength}
          onChange={(e) => setStayLength(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1 mo</span>
          <span>6 mo</span>
          <span>12 mo</span>
        </div>
      </div>

      {/* Housing Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Housing Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {([
            { value: "room", label: "Room" },
            { value: "studio", label: "Studio" },
            { value: "1br", label: "1 BR" },
            { value: "2br", label: "2 BR" },
          ] as { value: HousingType; label: string }[]).map((h) => (
            <button
              key={h.value}
              className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                housingType === h.value
                  ? "bg-[#1F9E94] text-white shadow-lg shadow-[#1F9E94]/30"
                  : "glass-card text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setHousingType(h.value)}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Traveler Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Traveler Type</label>
        <div className="grid grid-cols-2 gap-2">
          {(["solo", "couple"] as TravelerType[]).map((t) => (
            <button
              key={t}
              className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                travelerType === t
                  ? "bg-[#1F9E94] text-white shadow-lg shadow-[#1F9E94]/30"
                  : "glass-card text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setTravelerType(t)}
            >
              {t === "solo" ? "👤" : "👥"} {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Work Style */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Work Style</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: "remote", label: "Remote", icon: "💻" },
            { value: "local", label: "Local Job", icon: "🏢" },
            { value: "student", label: "Student", icon: "📚" },
          ] as { value: WorkStyle; label: string; icon: string }[]).map((w) => (
            <button
              key={w.value}
              className={`py-3 px-2 rounded-xl font-medium transition-all text-sm flex flex-col items-center gap-1 ${
                workStyle === w.value
                  ? "bg-[#1F9E94] text-white shadow-lg shadow-[#1F9E94]/30"
                  : "glass-card text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setWorkStyle(w.value)}
            >
              <span className="text-lg">{w.icon}</span>
              <span>{w.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={!country}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
          country
            ? "bg-gradient-to-r from-[#1F9E94] to-[#14b8a6] text-white shadow-lg shadow-[#1F9E94]/40 hover:shadow-xl hover:shadow-[#1F9E94]/50 active:scale-[0.98]"
            : "bg-gray-700 text-gray-500 cursor-not-allowed"
        }`}
      >
        Calculate Costs
      </button>
    </div>
  );
}
