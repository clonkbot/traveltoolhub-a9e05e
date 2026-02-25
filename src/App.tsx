import { useState } from "react";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { AirplaneIcon } from "./components/AirplaneIcon";
import { Calculator } from "./components/Calculator";
import { Results } from "./components/Results";
import { SavedPlans } from "./components/SavedPlans";
import { AdminPanel } from "./components/AdminPanel";
import { AuthScreen } from "./components/AuthScreen";
import type { Lifestyle, HousingType, TravelerType, WorkStyle } from "./data/costs";

type Screen = "home" | "results" | "saved" | "admin";

interface CalculationResult {
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
}

function AppContent() {
  const { signOut } = useAuthActions();
  const [screen, setScreen] = useState<Screen>("home");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [adminClickCount, setAdminClickCount] = useState(0);

  const handleCalculate = (data: CalculationResult) => {
    setResult(data);
    setScreen("results");
  };

  const handleTitleClick = () => {
    setAdminClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setScreen("admin");
        return 0;
      }
      // Reset after 2 seconds
      setTimeout(() => setAdminClickCount(0), 2000);
      return newCount;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] text-white relative">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1F9E94]/8 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#1F9E94]/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-lg mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0f14]/80 border-b border-white/5">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={handleTitleClick}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#1F9E94]/10 rounded-xl flex items-center justify-center border border-[#1F9E94]/20">
                <AirplaneIcon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h1 className="text-base font-bold text-white leading-tight">TravelToolHub</h1>
                <p className="text-xs text-gray-500">Move Abroad Calculator</p>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setScreen("saved")}
                className={`p-2 rounded-xl transition-colors ${
                  screen === "saved"
                    ? "bg-[#1F9E94]/20 text-[#1F9E94]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button
                onClick={() => signOut()}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6">
          {screen === "home" && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Move Abroad Cost Calculator
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Plan your relocation with accurate cost estimates
                </p>
              </div>
              <Calculator onCalculate={handleCalculate} />
            </div>
          )}

          {screen === "results" && result && (
            <Results
              data={result}
              onBack={() => setScreen("home")}
              onCompare={() => setScreen("home")}
            />
          )}

          {screen === "saved" && (
            <SavedPlans
              onSelect={(plan) => {
                setResult(plan as CalculationResult);
                setScreen("results");
              }}
              onBack={() => setScreen("home")}
            />
          )}

          {screen === "admin" && (
            <AdminPanel onBack={() => setScreen("home")} />
          )}
        </main>

        {/* Footer */}
        <footer className="px-4 py-6 text-center border-t border-white/5">
          <p className="text-gray-600 text-xs">
            Requested by @altyyy · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f14] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto border-2 border-[#1F9E94] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <AppContent />;
}
