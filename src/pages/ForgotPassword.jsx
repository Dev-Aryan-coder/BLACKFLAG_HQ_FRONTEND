import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "@/api/endpoints.jsx";
import { Skull, Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await forgotPasswordApi(email);
      if (res.data?.success) {
        setMessage(res.data.message || "Recovery pigeon dispatched! Check your mail for the OTP code.");
        setTimeout(() => {
          navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 1800);
      } else {
        setError(res.data?.message || "Failed to dispatch recovery OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md glass-panel-glow border-amber-500/30 relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Skull className="w-7 h-7 text-neutral-950 stroke-[2.2]" />
          </div>
          <CardTitle className="text-2xl font-sc text-amber-200">Lost Bearings?</CardTitle>
          <CardDescription className="text-xs font-garamond text-slate-400 italic">
            "Enter your registered pirate email to receive a recovery OTP code."
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {message && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-sc font-medium text-amber-100 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                SHIP'S MANIFEST EMAIL
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pirate@blackflag.com"
                className="bg-black/50 border-white/15"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-sc font-bold rounded-xl mt-2"
            >
              {isLoading ? "Dispatching Pigeon..." : "Send Recovery OTP"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-sc text-slate-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
