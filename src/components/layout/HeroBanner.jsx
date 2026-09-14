import React from "react";
import heroVideo from "@/assets/WhatsApp Video 2026-09-11 at 1.06.50 PM.mp4";
import { Compass, Anchor, Sparkles, Flame, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge.jsx";

export default function HeroBanner({ totalCrew = 0, readyCrew = 0, avgHealth = 0, avgMorale = 0 }) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-amber-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-4">
      {/* Background Video with Dramatic Cinematic Filter */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-60 contrast-110 saturate-125"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Dark Vignette and Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-black/50" />
        
        {/* Liquid Morphism Ambient Glows */}
        <div className="liquid-blob-1 -top-20 -left-20 w-80 h-80 bg-amber-600/30" />
        <div className="liquid-blob-2 -bottom-20 -right-20 w-96 h-96 bg-cyan-600/25" />
      </div>

      {/* Hero Banner Content Layer */}
      <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left: Titles & Mission Stance */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <Badge variant="glass" className="border-amber-400/40 text-amber-300 gap-1.5 py-1 px-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>BLACKFLAG ADMIRALTY</span>
            </Badge>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400/90 tracking-wide uppercase">All Guns Ready</span>
          </div>

          <h1 className="font-sc text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-400 drop-shadow-md">
            COMMAND CENTER
          </h1>

          <p className="font-garamond text-base sm:text-lg text-slate-300/90 italic leading-relaxed">
            "Manage your crew. Inspect battle readiness, balance ship vitals, and muster legends for the next high-seas raid."
          </p>
        </div>

        {/* Right: Liquid Glass Quick Stat Pill */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
          <div className="glass-pill px-5 py-3 rounded-2xl flex items-center gap-4 border border-amber-500/30">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-sc text-slate-400 uppercase tracking-wider">Fleet Status</div>
              <div className="text-sm font-sc font-bold text-amber-200">
                {readyCrew}/{totalCrew} Pirates Ready
              </div>
            </div>
          </div>

          <div className="glass-pill px-5 py-3 rounded-2xl flex items-center gap-4 border border-cyan-500/30">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-sc text-slate-400 uppercase tracking-wider">Combat Morale</div>
              <div className="text-sm font-sc font-bold text-cyan-200">
                {avgMorale}% High Spirits
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
