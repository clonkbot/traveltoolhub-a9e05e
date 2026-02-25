import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { AirplaneIcon } from "./AirplaneIcon";

export function AuthScreen() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      await signIn("password", formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signIn("anonymous");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to continue as guest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f14] flex items-center justify-center p-4">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#1F9E94]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#1F9E94]/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-[#1F9E94]/10 rounded-2xl border border-[#1F9E94]/20">
            <AirplaneIcon className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">TravelToolHub</h1>
          <p className="text-gray-400 text-sm">Move Abroad Calculator</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-6 space-y-6 animate-slide-up">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">
              {flow === "signIn" ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {flow === "signIn"
                ? "Sign in to access your saved plans"
                : "Join to save and track your relocation plans"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F9E94]/50 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F9E94]/50 focus:border-transparent transition-all"
              />
            </div>
            <input name="flow" type="hidden" value={flow} />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#1F9E94] to-[#14b8a6] text-white shadow-lg shadow-[#1F9E94]/30 hover:shadow-xl hover:shadow-[#1F9E94]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : flow === "signIn" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0d1218] text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleAnonymous}
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-medium border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-all disabled:opacity-50"
          >
            Continue as Guest
          </button>

          <p className="text-center text-sm text-gray-400">
            {flow === "signIn" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
              className="text-[#1F9E94] hover:text-[#14b8a6] font-medium transition-colors"
            >
              {flow === "signIn" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          Requested by @altyyy · Built by @clonkbot
        </p>
      </div>
    </div>
  );
}
