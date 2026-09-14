import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import heroVideo from "@/assets/WhatsApp Video 2026-09-11 at 1.06.50 PM.mp4";
import { 
  Skull, 
  Compass, 
  Anchor, 
  ShieldCheck, 
  Swords, 
  Crosshair, 
  HeartPulse, 
  Sparkles, 
  ArrowRight, 
  Users,
  Flame,
  Award,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";

export default function Home() {
  const { isAuthenticated, isAdmin } = useAuth();

  const destination = isAdmin
    ? "/admin/dashboard"
    : isAuthenticated
    ? "/crew/dashboard"
    : "/login";

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col overflow-hidden pb-20">
      
      {/* ========================================================================= */}
      {/* FULL-BLEED CINEMATIC VIDEO HERO BANNER                                    */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-2">
        
        {/* Background Video Player */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-[0.55] contrast-[1.15] saturate-[1.2]"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Deep Cinematic Gradients & Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-black/60" />
          
          {/* Animated Liquid Morphism Blobs */}
          <div className="liquid-blob-1 -top-20 -left-20 w-96 h-96 bg-amber-500/25" />
          <div className="liquid-blob-2 -bottom-20 -right-20 w-[32rem] h-[32rem] bg-cyan-500/20" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center space-y-8">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-amber-400/40 text-amber-300 text-xs font-sc shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="tracking-widest uppercase">The Admiralty Command Deck</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Majestic Hero Typography */}
          <div className="space-y-4">
            <h1 className="font-sc text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-[1.1]">
              COMMAND THE HIGH SEAS
            </h1>
            <p className="font-garamond text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto italic leading-relaxed">
              "A vessel without order is prey for the reef. Manage your crew, balance combat vitals, drill naval proficiencies, and orchestrate historic raids."
            </p>
          </div>

          {/* Quick Stats Pill Row */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <div className="glass-pill px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-amber-500/30">
              <Users className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <div className="text-[10px] font-sc text-slate-400 uppercase">Fleet Manifest</div>
                <div className="text-sm font-sc font-bold text-amber-200">Full Crew Roster</div>
              </div>
            </div>

            <div className="glass-pill px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <div className="text-[10px] font-sc text-slate-400 uppercase">Battle Readiness</div>
                <div className="text-sm font-sc font-bold text-emerald-200">Live Vitals Index</div>
              </div>
            </div>

            <div className="glass-pill px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-cyan-500/30">
              <Compass className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <div className="text-[10px] font-sc text-slate-400 uppercase">Tactical AI</div>
                <div className="text-sm font-sc font-bold text-cyan-200">Raid Matchmaker</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to={destination}>
              <Button
                size="lg"
                variant="default"
                className="rounded-full px-8 py-6 text-base font-sc font-bold tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] gap-2"
              >
                ENTER COMMAND CENTER <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link to="/login">
              <Button
                size="lg"
                variant="glass"
                className="rounded-full px-8 py-6 text-base font-sc font-bold tracking-wider gap-2 text-slate-200"
              >
                <Skull className="w-5 h-5 text-amber-300" /> BOARD VESSEL (LOGIN)
              </Button>
            </Link>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-8 flex justify-center text-slate-400 animate-bounce">
            <ChevronDown className="w-6 h-6 text-amber-400/80" />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6 COMMAND PILLARS (Matching Reference Design Features)                   */}
      {/* ========================================================================= */}
      <section className="py-16 space-y-10">
        
        {/* Section Title */}
        <div className="text-center space-y-2">
          <Badge variant="glass" className="font-sc text-xs text-amber-300 border-amber-400/30 px-3">
            TACTICAL ARCHITECTURE
          </Badge>
          <h2 className="font-sc text-3xl sm:text-5xl font-bold text-amber-100">
            FLEET COMMAND SYSTEMS
          </h2>
          <p className="font-garamond text-base sm:text-lg text-slate-400 italic max-w-xl mx-auto">
            "Everything an admiral requires to steer a pirate fleet from coastal skirmishes to legendary crown prizes."
          </p>
        </div>

        {/* 6 Feature Cards with Transparent Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Command Center */}
          <Card className="glass-panel hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-sc text-xl font-bold text-amber-200">
                Command Center Deck
              </h3>
              <p className="font-garamond text-slate-400 text-sm leading-relaxed">
                Live circular readiness gauges, real-time threat alerts for scurvy spikes, morale dips, and instant fleet status overviews.
              </p>
              <Link to="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs font-sc text-amber-400 hover:text-amber-300 pt-2">
                Inspect Deck <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Feature 2: Crew Roster */}
          <Card className="glass-panel hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-sc text-xl font-bold text-emerald-200">
                Crew Roster & Manifest
              </h3>
              <p className="font-garamond text-slate-400 text-sm leading-relaxed">
                Filter by 7 naval posts from Master Gunner to Quartermaster. Track live health points, morale ratings, and manage enlisting or discharge.
              </p>
              <Link to="/admin/crew" className="inline-flex items-center gap-1.5 text-xs font-sc text-emerald-400 hover:text-emerald-300 pt-2">
                View Manifest <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Feature 3: Skills Matrix */}
          <Card className="glass-panel hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                <Crosshair className="w-6 h-6" />
              </div>
              <h3 className="font-sc text-xl font-bold text-cyan-200">
                Tactical Skills Matrix
              </h3>
              <p className="font-garamond text-slate-400 text-sm leading-relaxed">
                Cross-compare crew across Swordsmanship, Cannon Gunnery, Navigation, Rigging, Stealth, and Medicine with illuminated top-gunner badges.
              </p>
              <Link to="/admin/skills" className="inline-flex items-center gap-1.5 text-xs font-sc text-cyan-400 hover:text-cyan-300 pt-2">
                Open Matrix <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Feature 4: Vitals & Health */}
          <Card className="glass-panel hover:border-rose-500/50 transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-sc text-xl font-bold text-rose-200">
                Ship's Sickbay & Vitals
              </h3>
              <p className="font-garamond text-slate-400 text-sm leading-relaxed">
                Combat scurvy with lime rations, administer grog for morale recovery, and dress wounds to keep buccaneers combat certified.
              </p>
              <Link to="/admin/vitals" className="inline-flex items-center gap-1.5 text-xs font-sc text-rose-400 hover:text-rose-300 pt-2">
                Check Sickbay <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Feature 5: Mission Planner */}
          <Card className="glass-panel hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Swords className="w-6 h-6" />
              </div>
              <h3 className="font-sc text-xl font-bold text-amber-200">
                Mission Planner & AI Matching
              </h3>
              <p className="font-garamond text-slate-400 text-sm leading-relaxed">
                Define raid parameters from Low Risk Coastal Sloops to Legendary Kraken Raids. Algorithmically rank the best crew matches and assign orders.
              </p>
              <Link to="/admin/missions" className="inline-flex items-center gap-1.5 text-xs font-sc text-amber-400 hover:text-amber-300 pt-2">
                Plan Raid <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Feature 6: Pirate Quarters */}
          <Card className="glass-panel hover:border-yellow-500/50 transition-all duration-300 group hover:-translate-y-1">
            <CardContent className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-300 group-hover:scale-110 transition-transform">
                <Anchor className="w-6 h-6" />
              </div>
              <h3 className="font-sc text-xl font-bold text-yellow-200">
                Crew Self-Service Quarters
              </h3>
              <p className="font-garamond text-slate-400 text-sm leading-relaxed">
                Enlisted crew can log in to view their personal radar chart, vitals progress, active duty orders, and update their portrait medallion.
              </p>
              <Link to="/crew/dashboard" className="inline-flex items-center gap-1.5 text-xs font-sc text-yellow-400 hover:text-yellow-300 pt-2">
                Crew Quarters <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* PIRATE ARTICLES BANNER                                                    */}
      {/* ========================================================================= */}
      <section className="mt-8 p-8 rounded-3xl glass-panel-glow border-amber-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-300">
          <Flame className="w-6 h-6" />
        </div>
        <h3 className="font-sc text-2xl sm:text-3xl font-bold text-amber-200">
          UNDER THE ARTICLES OF THE BLACK FLAG
        </h3>
        <p className="font-garamond text-slate-300 italic max-w-2xl mx-auto">
          "Every man shall have an equal vote in affairs of moment. He shall have equal title to the fresh provisions, and strong liquors at any time seized."
        </p>
        <div className="pt-2">
          <Link to="/login">
            <Button variant="default" className="rounded-full px-8 py-3 font-sc font-bold">
              Sign Articles & Enlist Now
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
