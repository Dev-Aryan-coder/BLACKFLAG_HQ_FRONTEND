import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-amber-500/20 text-amber-300 border-amber-500/40",
        secondary:
          "border-transparent bg-slate-800 text-slate-300 border-slate-700",
        destructive:
          "border-transparent bg-rose-500/20 text-rose-300 border-rose-500/40",
        success:
          "border-transparent bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        warning:
          "border-transparent bg-amber-500/20 text-amber-300 border-amber-500/40",
        info:
          "border-transparent bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
        glass:
          "glass-pill text-amber-200 border-white/10 shadow-sm",
        gold:
          "bg-amber-400 text-neutral-950 font-bold border-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
