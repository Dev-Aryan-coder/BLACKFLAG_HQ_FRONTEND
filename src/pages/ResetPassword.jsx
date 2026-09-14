import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "@/api/endpoints.jsx";
import { KeyRound, ShieldCheck, Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlEmail = searchParams.get("email");
    if (urlEmail) setEmail(urlEmail);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await resetPasswordApi({ email, otpCode, newPassword });
      if (res.data?.success) {
        setMessage("Secret phrase updated successfully! Steering towards the quarterdeck...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(res.data?.message || "Password reset failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP code or expired token.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md glass-panel-glow border-amber-500/30 relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <KeyRound className="w-7 h-7 text-neutral-950 stroke-[2.2]" />
          </div>
          <CardTitle className="text-2xl font-sc text-amber-200">Reset Secret Phrase</CardTitle>
          <CardDescription className="text-xs font-garamond text-slate-400 italic">
            "Enter the 6-digit OTP code sent to your mail and forge a new password."
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
                PIRATE EMAIL
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

            <div className="space-y-1.5">
              <label className="text-xs font-sc font-medium text-amber-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                6-DIGIT OTP CODE
              </label>
              <Input
                type="text"
                required
                maxLength={10}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.trim())}
                placeholder="123456"
                className="bg-black/50 border-white/15 font-mono tracking-widest text-center text-lg font-bold text-amber-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sc font-medium text-amber-100 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                NEW SECRET PHRASE
              </label>
              <Input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-black/50 border-white/15"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-sc font-bold rounded-xl mt-2"
            >
              {isLoading ? "Re-sealing Manifest..." : "Set New Secret Phrase"}
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
