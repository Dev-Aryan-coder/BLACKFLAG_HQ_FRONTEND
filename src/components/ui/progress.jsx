import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value, color = "emerald", ...props }, ref) => {
  const colorGradients = {
    emerald: "from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
    amber: "from-amber-500 to-yellow-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    rose: "from-rose-600 to-red-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]",
    cyan: "from-cyan-500 to-blue-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    gold: "from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-slate-900/80 border border-white/5",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-all duration-500",
          colorGradients[color] || colorGradients.emerald
        )}
        style={{ width: `${Math.min(100, Math.max(0, value || 0))}%` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
