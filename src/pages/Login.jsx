import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { Skull, Anchor, KeyRound, Mail, AlertCircle, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function Login() {
  const [email, setEmail] = useState("admin@blackflag.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    if (result.success) {
      if (result.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/crew/dashboard");
      }
    } else {
      setError(result.message || "Invalid email or credentials.");
    }
  };

  const fillAdmin = () => {
    setEmail("admin@blackflag.com");
    setPassword("admin123");
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center px-4 py-12">
      {/* Background liquid blobs */}
      <div className="liquid-blob-1 top-1/4 left-1/4 w-96 h-96 bg-amber-500/20" />
      <div className="liquid-blob-2 bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15" />

      <Card className="w-full max-w-md glass-panel-glow border border-amber-500/30 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        <CardHeader className="text-center space-y-3 pb-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.5)]">
            <Skull className="w-8 h-8 text-neutral-950 stroke-[2.2]" />
          </div>
          <div>
            <CardTitle className="text-3xl font-sc text-amber-200 tracking-wider">
              CREWCOMMAND
            </CardTitle>
            <CardDescription className="text-sm font-garamond text-slate-400 italic">
              "Enter the quarterdeck. Enter the BlackFlag fleet."
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-sc font-medium text-amber-100 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                PIRATE EMAIL
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@blackflag.com"
                className="bg-black/50 border-white/15"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-sc font-medium text-amber-100 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  SECRET PHRASE
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-garamond italic text-amber-400/80 hover:text-amber-300 transition-colors"
                >
                  Forgot phrase?
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-black/50 border-white/15"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-sc rounded-xl font-bold mt-2"
            >
              {isLoading ? (
                <span>Checking Ship Manifest...</span>
              ) : (
                <span className="flex items-center gap-2">
                  BOARD VESSEL <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Quick Fill Default Admin */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col items-center gap-2">
            <span className="text-[11px] font-garamond text-slate-400">
              Default Fleet Commander credentials:
            </span>
            <button
              type="button"
              onClick={fillAdmin}
              className="px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono transition-all flex items-center gap-2"
            >
              <Shield className="w-3 h-3" />
              <span>admin@blackflag.com / admin123</span>
            </button>
            <div className="pt-2 text-center">
              <Link
                to="/verify-otp"
                className="text-[11px] font-sc text-slate-400 hover:text-emerald-300 transition-colors"
              >
                Received an OTP invite code? <span className="underline">Verify Account</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
