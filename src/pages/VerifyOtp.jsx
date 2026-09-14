import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { verifyOtpApi, resendOtpApi } from "@/api/endpoints.jsx";
import { CheckCircle2, AlertCircle, RefreshCw, ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";

export default function VerifyOtp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const urlEmail = searchParams.get("email");
    if (urlEmail) setEmail(urlEmail);
  }, [searchParams]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await verifyOtpApi({
        email,
        otpCode,
        purpose: "EMAIL_VERIFY",
      });

      if (res.data?.success) {
        setMessage("Account verified! You may now board the vessel.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(res.data?.message || "Verification failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please provide your email address first.");
      return;
    }
    setIsResending(true);
    setError("");
    setMessage("");
    try {
      const res = await resendOtpApi(email, "EMAIL_VERIFY");
      if (res.data?.success) {
        setMessage("A fresh verification code has been dispatched to your mail.");
      } else {
        setError(res.data?.message || "Failed to resend code.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend verification OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md glass-panel-glow border-amber-500/30 relative z-10 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <ShieldCheck className="w-7 h-7 text-neutral-950 stroke-[2.2]" />
          </div>
          <CardTitle className="text-2xl font-sc text-emerald-300">Verify Ship Articles</CardTitle>
          <CardDescription className="text-xs font-garamond text-slate-400 italic">
            "Enter the 6-digit confirmation code delivered to your correspondence."
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
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
                REGISTERED EMAIL
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
                VERIFICATION CODE
              </label>
              <Input
                type="text"
                required
                maxLength={10}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.trim())}
                placeholder="123456"
                className="bg-black/50 border-white/15 font-mono tracking-widest text-center text-lg font-bold text-emerald-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-sc font-bold rounded-xl mt-2"
            >
              {isLoading ? "Validating Articles..." : "Confirm & Verify Account"}
            </Button>
          </form>

          {/* Resend Action */}
          <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10 text-xs">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 font-sc text-slate-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>

            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-sc text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`} />
              Resend OTP Code
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
