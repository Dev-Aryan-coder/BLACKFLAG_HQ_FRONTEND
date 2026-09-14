import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPiratesApi, fetchMissionsApi } from "@/api/endpoints.jsx";
import HeroBanner from "@/components/layout/HeroBanner.jsx";
import { 
  Users, 
  ShieldCheck, 
  Heart, 
  Smile, 
  AlertTriangle, 
  Compass, 
  ArrowUpRight, 
  Activity,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function Dashboard() {
  const [pirates, setPirates] = useState([]);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [piratesRes, missionsRes] = await Promise.allSettled([
        fetchPiratesApi(),
        fetchMissionsApi(),
      ]);

      if (piratesRes.status === "fulfilled" && piratesRes.value.data?.success) {
        setPirates(piratesRes.value.data.data || []);
      }
      if (missionsRes.status === "fulfilled" && missionsRes.value.data?.success) {
        setMissions(missionsRes.value.data.data || []);
      }
    } catch (err) {
      setError("Failed to load command deck data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute live metrics from real API data
  const totalCrew = pirates.length;
  // A pirate is ready if healthHp >= 70, scurvyLevel <= 40, morale >= 60, and active
  const readyPirates = pirates.filter(
    (p) => p.active && (p.healthHp || 0) >= 70 && (p.scurvyLevel || 0) <= 40 && (p.morale || 0) >= 60
  );
  const readyCount = readyPirates.length;
  const readinessPercent = totalCrew > 0 ? Math.round((readyCount / totalCrew) * 100) : 0;

  const avgHealth = totalCrew > 0 
    ? Math.round(pirates.reduce((acc, p) => acc + (p.healthHp || 0), 0) / totalCrew) 
    : 0;

  const avgMorale = totalCrew > 0 
    ? Math.round(pirates.reduce((acc, p) => acc + (p.morale || 0), 0) / totalCrew) 
    : 0;

  // Alerts generated from real crew stats
  const alerts = [];
  pirates.forEach((p) => {
    if ((p.morale || 0) < 50) {
      alerts.push({
        id: `morale-${p.id}`,
        pirateName: p.name,
        type: "Low Morale",
        value: `${p.morale}%`,
        severity: "warning",
      });
    }
    if ((p.scurvyLevel || 0) > 45) {
      alerts.push({
        id: `scurvy-${p.id}`,
        pirateName: p.name,
        type: "High Scurvy",
        value: `${p.scurvyLevel}%`,
        severity: "critical",
      });
    }
    if ((p.healthHp || 0) < 60) {
      alerts.push({
        id: `health-${p.id}`,
        pirateName: p.name,
        type: "Needs Rest & Quarters",
        value: `${p.healthHp} HP`,
        severity: "critical",
      });
    }
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner with User's Video */}
      <HeroBanner
        totalCrew={totalCrew}
        readyCrew={readyCount}
        avgHealth={avgHealth}
        avgMorale={avgMorale}
      />

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Crew */}
        <Card className="glass-panel border-white/10 hover:border-amber-500/40 transition-all group">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-sc uppercase tracking-wider text-slate-400">Total Crew</p>
              <h3 className="text-3xl font-sc font-bold text-amber-100 mt-1">{totalCrew}</h3>
              <span className="text-[11px] font-garamond text-amber-400/80">Active ship muster</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Mission Ready */}
        <Card className="glass-panel border-white/10 hover:border-emerald-500/40 transition-all group">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-sc uppercase tracking-wider text-slate-400">Mission Ready</p>
              <h3 className="text-3xl font-sc font-bold text-emerald-300 mt-1">{readyCount}</h3>
              <span className="text-[11px] font-garamond text-emerald-400/80">Combat certified</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Health */}
        <Card className="glass-panel border-white/10 hover:border-rose-500/40 transition-all group">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-sc uppercase tracking-wider text-slate-400">Avg. Health</p>
              <h3 className="text-3xl font-sc font-bold text-rose-300 mt-1">{avgHealth}%</h3>
              <span className="text-[11px] font-garamond text-rose-400/80">Shipboard vitals</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Morale */}
        <Card className="glass-panel border-white/10 hover:border-cyan-500/40 transition-all group">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-sc uppercase tracking-wider text-slate-400">Avg. Morale</p>
              <h3 className="text-3xl font-sc font-bold text-cyan-300 mt-1">{avgMorale}%</h3>
              <span className="text-[11px] font-garamond text-cyan-400/80">Rum & Plunder spirits</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Smile className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Split: Readiness Radial Gauge vs Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Crew Readiness Radial Ring Card */}
        <Card className="glass-panel-glow border-amber-500/30 lg:col-span-1 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-amber-200">Crew Readiness</CardTitle>
              <Badge variant="glass" className="text-emerald-300 border-emerald-500/40">
                Live Gauge
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            {/* SVG Circular Radial Progress Gauge */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-900"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Progress Arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * (readinessPercent || 0)) / 100}
                  strokeLinecap="round"
                  stroke="url(#readinessGradient)"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Metrics */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-sc text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-200">
                  {readinessPercent}%
                </span>
                <span className="text-xs font-garamond text-slate-400 mt-0.5">
                  {readyCount} / {totalCrew} Ready
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-300 font-garamond italic">
                {readinessPercent >= 75 
                  ? "Vessel is battle-primed. Hoist the colors!"
                  : "Attention needed: rest exhausted deckhands and cure scurvy."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts Card */}
        <Card className="glass-panel border-white/10 lg:col-span-2 flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-white/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Recent Shipboard Alerts
              </CardTitle>
              <span className="text-xs font-mono text-slate-400">
                {alerts.length} Warnings Active
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-sc text-lg text-emerald-300">All Ships In Order</h4>
                <p className="text-xs font-garamond text-slate-400 max-w-sm">
                  No active scurvy spikes or morale crises detected across the crew manifest.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          alert.severity === "critical" ? "bg-rose-500 animate-ping" : "bg-amber-400"
                        }`}
                      />
                      <div>
                        <span className="font-sc font-medium text-sm text-slate-200">
                          {alert.pirateName}
                        </span>
                        <span className="text-xs text-slate-400 ml-2 font-garamond">
                          — {alert.type}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={alert.severity === "critical" ? "destructive" : "warning"}
                      className="font-mono text-xs"
                    >
                      {alert.value}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-3">
              <Link to="/admin/crew">
                <Button size="sm" variant="default" className="gap-1.5 font-sc text-xs">
                  <Users className="w-3.5 h-3.5" />
                  Open Full Roster
                </Button>
              </Link>
              <Link to="/admin/missions">
                <Button size="sm" variant="outline" className="gap-1.5 font-sc text-xs">
                  <Compass className="w-3.5 h-3.5" />
                  Mission Planner
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
