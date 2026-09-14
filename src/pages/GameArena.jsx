import React, { useState, useEffect } from "react";
import { 
  Swords, 
  RotateCcw, 
  Maximize2, 
  Trophy, 
  ShieldAlert, 
  Volume2, 
  Gamepad2, 
  Sparkles,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function GameArena() {
  const [bestScore, setBestScore] = useState(0);
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateScore = () => {
      const saved = localStorage.getItem("pearlBest") || 0;
      setBestScore(Number(saved));
    };
    updateScore();
    const interval = setInterval(updateScore, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
    setIframeKey(Date.now());
  };

  const handleToggleFullscreen = () => {
    const container = document.getElementById("game-frame-container");
    if (!document.fullscreenElement) {
      container?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in-50 duration-500">
      {/* Top Banner */}
      <div className="glass-panel-glow p-6 rounded-2xl border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-neutral-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Swords className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sc text-3xl font-bold tracking-wider text-amber-200">
                Defend The Black Pearl
              </h1>
              <Badge variant="outline" className="border-amber-400/40 text-amber-300 bg-amber-500/10 text-xs">
                Active Lagoon Combat
              </Badge>
            </div>
            <p className="font-garamond text-slate-300 text-sm mt-0.5">
              The King's Royal Armada is storming the lagoon. Hold the line, fire broadsides, and plunder doubloons!
            </p>
          </div>
        </div>

        {/* Action Controls & Best Score */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold tracking-wider">
              BEST HAUL: {bestScore}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="border-white/20 hover:border-amber-400 hover:text-amber-200 gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Battle
          </Button>
          <Button
            size="sm"
            onClick={handleToggleFullscreen}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-bold hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.3)] gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Fullscreen Arena
          </Button>
        </div>
      </div>

      {/* Embedded Game Canvas Arena */}
      <div 
        id="game-frame-container"
        className="relative rounded-2xl overflow-hidden glass-panel-glow border-amber-500/35 shadow-[0_0_40px_rgba(0,0,0,0.8)] h-[70vh] min-h-[520px] w-full"
      >
        <iframe
          key={iframeKey}
          src="/game.html"
          title="Defend The Black Pearl"
          className="w-full h-full border-0 block"
          allow="autoplay"
        />
      </div>

      {/* Tactical Controls Reference Sheet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-panel border-white/10 hover:border-amber-500/30 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-200 text-sm font-sc flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              Helm & Navigation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs font-garamond text-slate-300 space-y-1.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="font-mono text-amber-300">W / S</span>
              <span>Throttle ahead & astern</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="font-mono text-amber-300">A / D</span>
              <span>Rudder port & starboard</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-amber-300">Q / E</span>
              <span>Nudge cannon traverse</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 hover:border-amber-500/30 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-200 text-sm font-sc flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              Cannon Ordnance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs font-garamond text-slate-300 space-y-1.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="font-mono text-amber-300">SPACE</span>
              <span>Fire active battery</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="font-mono text-amber-300">1 / 2 / 3</span>
              <span>Round / Chain / Grapeshot</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-amber-300">Mouse Drag</span>
              <span>Direct broadside targeting</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 hover:border-amber-500/30 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-200 text-sm font-sc flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Supernatural Powers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs font-garamond text-slate-300 space-y-1.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="font-mono text-amber-300">X Key</span>
              <span>Mystic Sea Shield (Invulnerable)</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="font-mono text-amber-300">R Key</span>
              <span>Emergency timber & hull repair</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-amber-300">Pickups</span>
              <span>Rapid reload, Salvo crate & Timber</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
