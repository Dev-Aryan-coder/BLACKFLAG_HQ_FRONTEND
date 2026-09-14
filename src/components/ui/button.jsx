import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black font-semibold shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_28px_rgba(245,158,11,0.55)] hover:brightness-110",
        gold:
          "bg-[#d4af37] hover:bg-[#e6c24d] text-neutral-950 font-semibold shadow-lg shadow-amber-900/30",
        destructive:
          "bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg shadow-rose-950/40 hover:bg-rose-600",
        outline:
          "border border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md",
        glass:
          "glass-pill text-amber-100 hover:text-white hover:border-amber-400/40 hover:bg-white/10 transition-all",
        liquid:
          "relative overflow-hidden bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/60 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]",
        secondary:
          "bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700/50",
        ghost: "hover:bg-white/10 text-slate-300 hover:text-white",
        link: "text-amber-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
