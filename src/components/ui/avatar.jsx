import * as React from "react";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, src, alt, fallback, ...props }, ref) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-amber-500/30 bg-slate-900 shadow-md shadow-black/50 items-center justify-center text-xs font-bold text-amber-200 uppercase",
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="font-sc">{fallback || "☠"}</span>
      )}
    </div>
  );
});
Avatar.displayName = "Avatar";

export { Avatar };
