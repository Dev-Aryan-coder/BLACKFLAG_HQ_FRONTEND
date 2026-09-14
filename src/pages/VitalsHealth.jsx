import React, { useState, useEffect } from "react";
import { fetchPiratesApi, updatePirateVitalsApi } from "@/api/endpoints.jsx";
import { 
  Heart, 
  Smile, 
  ShieldAlert, 
  Activity, 
  Zap, 
  Sparkles, 
  Pill, 
  Coffee, 
  Bandage, 
  RefreshCw 
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Avatar } from "@/components/ui/avatar.jsx";
import { Progress } from "@/components/ui/progress.jsx";

export default function VitalsHealth() {
  const [pirates, setPirates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchPiratesApi();
      if (res.data?.success) {
        setPirates(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load vitals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const total = pirates.length;
  const avgHealth = total > 0 
    ? Math.round(pirates.reduce((acc, p) => acc + (p.healthHp || 0), 0) / total) 
    : 0;

  const avgScurvy = total > 0 
    ? Math.round(pirates.reduce((acc, p) => acc + (p.scurvyLevel || 0), 0) / total) 
    : 0;

  const avgMorale = total > 0 
    ? Math.round(pirates.reduce((acc, p) => acc + (p.morale || 0), 0) / total) 
    : 0;

  // Breakdown
  const missionReadyCount = pirates.filter(
    (p) => p.active && (p.healthHp || 0) >= 70 && (p.scurvyLevel || 0) <= 40 && (p.morale || 0) >= 60
  ).length;

  const needRestCount = pirates.filter(
    (p) => p.active && ((p.healthHp || 0) < 70 || (p.morale || 0) < 60) && (p.healthHp || 0) >= 40
  ).length;

  const unfitCount = pirates.filter(
    (p) => p.active && ((p.healthHp || 0) < 40 || (p.scurvyLevel || 0) > 60)
  ).length;

  // Quick Treatments
  const applyTreatment = async (pirate, type) => {
    let healthHp = pirate.healthHp || 100;
    let scurvyLevel = pirate.scurvyLevel || 0;
    let morale = pirate.morale || 100;

    if (type === "citrus") {
      // Cure scurvy
      scurvyLevel = Math.max(0, scurvyLevel - 35);
      morale = Math.min(100, morale + 10);
    } else if (type === "rum") {
      // Boost morale
      morale = Math.min(100, morale + 25);
    } else if (type === "bandage") {
      // Heal HP
      healthHp = Math.min(100, healthHp + 30);
    }

    try {
      await updatePirateVitalsApi(pirate.id, { healthHp, scurvyLevel, morale });
      loadData();
    } catch (err) {
      alert("Treatment failed: " + (err.response?.data?.message || err.message));
    }
  };

  const getScurvyLabel = (avg) => {
    if (avg < 25) return "Low";
    if (avg < 50) return "Moderate";
    return "High";
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header matching Reference Image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sc text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-yellow-300">
            Vitals & Health
          </h1>
          <p className="text-sm font-garamond text-slate-400 italic">
            "Monitor crew health, scurvy and morale."
          </p>
        </div>
        <Button onClick={loadData} variant="outline" size="sm" className="font-sc gap-2 text-xs">
          <RefreshCw className="w-3.5 h-3.5" /> Re-scan Fleet Vitals
        </Button>
      </div>

      {/* Main Gauges Row matching View 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: 3 Circular Radial Gauges (8 cols) */}
        <Card className="glass-panel-glow border-amber-500/30 lg:col-span-8 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl text-amber-200">Fleet Vitals Index</CardTitle>
            <CardDescription>Aggregate condition across all decks</CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
            
            {/* Gauge 1: Crew Health */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" strokeWidth="7" stroke="#1e293b" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    strokeWidth="7"
                    strokeDasharray={238.7}
                    strokeDashoffset={238.7 - (238.7 * avgHealth) / 100}
                    strokeLinecap="round"
                    stroke="#10b981"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <Heart className="w-5 h-5 text-emerald-400 mb-1" />
                  <span className="font-sc text-2xl font-bold text-emerald-300">{avgHealth}%</span>
                </div>
              </div>
              <span className="font-sc text-sm font-medium text-slate-200 mt-3">Crew Health</span>
            </div>

            {/* Gauge 2: Scurvy Level */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" strokeWidth="7" stroke="#1e293b" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    strokeWidth="7"
                    strokeDasharray={238.7}
                    strokeDashoffset={238.7 - (238.7 * avgScurvy) / 100}
                    strokeLinecap="round"
                    stroke={avgScurvy < 30 ? "#10b981" : avgScurvy < 60 ? "#f59e0b" : "#f43f5e"}
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="font-sc text-2xl font-bold text-amber-300">
                    {getScurvyLabel(avgScurvy)}
                  </span>
                </div>
              </div>
              <span className="font-sc text-sm font-medium text-slate-200 mt-3">Scurvy Level</span>
            </div>

            {/* Gauge 3: Morale */}
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" strokeWidth="7" stroke="#1e293b" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    strokeWidth="7"
                    strokeDasharray={238.7}
                    strokeDashoffset={238.7 - (238.7 * avgMorale) / 100}
                    strokeLinecap="round"
                    stroke="#eab308"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <Smile className="w-5 h-5 text-yellow-400 mb-1" />
                  <span className="font-sc text-2xl font-bold text-yellow-300">{avgMorale}%</span>
                </div>
              </div>
              <span className="font-sc text-sm font-medium text-slate-200 mt-3">Morale</span>
            </div>

          </div>
        </Card>

        {/* Right Card: Crew Status Distribution (4 cols) */}
        <Card className="glass-panel border-white/10 lg:col-span-4 p-6 flex flex-col justify-between">
          <div>
            <CardTitle className="text-xl text-amber-200">Crew Status</CardTitle>
            <CardDescription className="mb-6">Raid capability breakdown</CardDescription>
            <div className="space-y-4">
              {/* Ready */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-emerald-500/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="font-sc text-sm text-slate-200">Mission Ready</span>
                </div>
                <span className="font-mono text-base font-bold text-emerald-400">{missionReadyCount}</span>
              </div>

              {/* Need Rest */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-amber-500/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  <span className="font-sc text-sm text-slate-200">Need Rest</span>
                </div>
                <span className="font-mono text-base font-bold text-amber-400">{needRestCount}</span>
              </div>

              {/* Unfit */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-rose-500/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <span className="font-sc text-sm text-slate-200">Unfit / Critical</span>
                </div>
                <span className="font-mono text-base font-bold text-rose-400">{unfitCount}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <span className="text-xs font-garamond text-slate-400 italic">
              "A captain who hoards fresh limes avoids losing his best gunners."
            </span>
          </div>
        </Card>

      </div>

      {/* Sickbay & Treatment Deck */}
      <Card className="glass-panel border-white/10 p-6">
        <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl text-amber-200">Ship's Sickbay & Quartermaster Supplies</CardTitle>
            <CardDescription>Administer direct treatments to keep the crew battle-ready</CardDescription>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {pirates.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar
                    src={p.avatarUrl}
                    alt={p.name}
                    fallback={p.name ? p.name[0] : "P"}
                    className="w-8 h-8"
                  />
                  <div>
                    <span className="font-sc font-medium text-sm text-slate-200">{p.name}</span>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {p.pirateRole?.replace("_", " ")}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={p.healthHp < 60 || p.scurvyLevel > 50 ? "destructive" : "success"}
                  className="text-[10px] font-mono"
                >
                  {p.healthHp} HP
                </Badge>
              </div>

              {/* Mini Vitals Bars */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Scurvy: {p.scurvyLevel}%</span>
                  <span>Morale: {p.morale}%</span>
                </div>
                <Progress value={p.healthHp} color="emerald" />
              </div>

              {/* Quick Treatment Buttons */}
              <div className="pt-2 flex gap-1.5 justify-between">
                <button
                  onClick={() => applyTreatment(p, "citrus")}
                  title="Cure Scurvy with Lime Rations (-35% scurvy)"
                  className="flex-1 py-1 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-[11px] text-emerald-300 font-sc transition-colors flex items-center justify-center gap-1"
                >
                  <Pill className="w-3 h-3" /> Lime
                </button>
                <button
                  onClick={() => applyTreatment(p, "rum")}
                  title="Share Rum Grog (+25% Morale)"
                  className="flex-1 py-1 px-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/30 text-[11px] text-amber-300 font-sc transition-colors flex items-center justify-center gap-1"
                >
                  <Coffee className="w-3 h-3" /> Grog
                </button>
                <button
                  onClick={() => applyTreatment(p, "bandage")}
                  title="Field Dressing & Bandages (+30 HP)"
                  className="flex-1 py-1 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 text-[11px] text-rose-300 font-sc transition-colors flex items-center justify-center gap-1"
                >
                  <Bandage className="w-3 h-3" /> Heal
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
