import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Skull, 
  LayoutDashboard, 
  Users, 
  Crosshair, 
  HeartPulse, 
  Compass, 
  FileText,
  Swords,
  Play,
  Maximize2,
  Trophy,
  RotateCcw,
  Sparkles
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function SidebarDock() {
  const location = useLocation();
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(Date.now());
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const updateScore = () => {
      const score = localStorage.getItem("pearlBest") || 0;
      setBestScore(Number(score));
    };
    updateScore();
    const interval = setInterval(updateScore, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Crew Roster", path: "/admin/crew", icon: Users },
    { name: "Skills & Matrix", path: "/admin/skills", icon: Crosshair },
    { name: "Vitals & Health", path: "/admin/vitals", icon: HeartPulse },
    { name: "Mission Planner", path: "/admin/missions", icon: Compass },
    { name: "Reports", path: "/admin/vitals", icon: FileText },
    { 
      name: "Defend The Pearl", 
      path: "/admin/game", 
      icon: Swords, 
      highlight: true,
      badge: "GAME" 
    },
  ];

  return (
    <>
      <aside className="hidden lg:flex flex-col w-60 shrink-0 py-2">
        {/* Glassmorphism Sidebar Dock matching reference design */}
        <div className="glass-panel-glow border-amber-500/25 rounded-2xl p-4 flex flex-col justify-between h-[calc(100vh-6rem)] sticky top-24 shadow-2xl backdrop-blur-2xl overflow-y-auto no-scrollbar">
          
          {/* Top Section */}
          <div>
            {/* Brand Header */}
            <div className="flex items-center gap-2.5 px-2 py-2 mb-4 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-neutral-950 font-bold shadow-[0_0_14px_rgba(245,158,11,0.5)]">
                <Skull className="w-4 h-4 stroke-[2.4]" />
              </div>
              <div>
                <span className="font-sc text-lg font-bold tracking-wider text-amber-200 block leading-none">
                  CrewCommand
                </span>
                <span className="text-[9px] font-garamond italic text-amber-400/70 tracking-widest uppercase">
                  Fleet Deck
                </span>
              </div>
            </div>

            {/* Navigation Pill Items */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name + item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sc tracking-wide transition-all duration-200 select-none ${
                      isActive
                        ? "bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)] font-semibold"
                        : item.highlight
                        ? "text-amber-300/90 hover:text-amber-100 hover:bg-amber-500/10 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive || item.highlight ? "text-amber-400" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded bg-amber-500/30 text-amber-300 border border-amber-400/40 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Game Station Box directly below Reports */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="rounded-xl p-3 bg-gradient-to-b from-amber-950/40 via-black/40 to-cyan-950/30 border border-amber-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                
                {/* Decorative Glow */}
                <div className="absolute -right-6 -top-6 w-20 h-20 bg-amber-500/20 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Swords className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-sc text-[11px] font-bold text-amber-200 tracking-wider">
                      Defend The Pearl
                    </span>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </div>

                <p className="text-[10px] font-garamond text-slate-300 italic line-clamp-2 leading-tight mb-2.5">
                  The King's Royal Armada attacks the lagoon. Man the cannons!
                </p>

                {bestScore > 0 && (
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400/90 bg-black/40 px-2 py-1 rounded border border-amber-500/20 mb-2.5">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Trophy className="w-3 h-3 text-amber-400" /> Best:
                    </span>
                    <span className="font-bold">{bestScore} pts</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => {
                      setModalKey(Date.now());
                      setGameModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold text-[10px] font-sc tracking-wider hover:brightness-110 shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    Quick Play
                  </button>

                  <Link
                    to="/admin/game"
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-amber-200 text-[10px] font-sc tracking-wider border border-amber-500/25 transition-all text-center"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    Full Arena
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Lore / Status */}
          <div className="pt-3 border-t border-white/10 px-1 mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Colors Hoisted
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">v1.0.4</span>
            </div>
            <p className="text-[10px] font-garamond text-slate-500 italic mt-1 leading-snug">
              "Articles signed under the Black Flag."
            </p>
          </div>

        </div>
      </aside>

      {/* In-Page Quick Play Modal */}
      <Dialog open={gameModalOpen} onOpenChange={setGameModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[88vh] p-4 flex flex-col border-amber-500/40 bg-[#041923]/95 backdrop-blur-2xl">
          <DialogHeader className="pb-2 border-b border-white/10 shrink-0">
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <Swords className="w-4 h-4" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Defend The Black Pearl</DialogTitle>
                  <DialogDescription className="text-xs text-slate-300">
                    W/S: throttle · A/D: steer · Q/E: cannons · Space: fire · X: shield · R: repair
                  </DialogDescription>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setModalKey(Date.now())}
                  className="h-8 text-xs border-white/20 hover:border-amber-400 hover:text-amber-200 gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restart
                </Button>
                <Link
                  to="/admin/game"
                  onClick={() => setGameModalOpen(false)}
                  className="inline-flex items-center gap-1 h-8 px-2.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-sc border border-amber-500/30 transition-colors"
                >
                  <Maximize2 className="w-3 h-3" />
                  Arena Deck
                </Link>
              </div>
            </div>
          </DialogHeader>

          {/* Canvas iFrame Frame */}
          <div className="flex-1 w-full rounded-xl overflow-hidden border border-amber-500/20 relative mt-2 bg-[#041923]">
            <iframe
              key={modalKey}
              src="/game.html"
              title="Defend The Black Pearl Arcade"
              className="w-full h-full border-0 block"
              allow="autoplay"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
