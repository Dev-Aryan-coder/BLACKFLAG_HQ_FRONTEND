import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPiratesApi } from "@/api/endpoints.jsx";
import { 
  Swords, 
  Crosshair, 
  Compass, 
  Anchor, 
  Ghost, 
  BriefcaseMedical, 
  Sparkles,
  RefreshCw,
  Award
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Avatar } from "@/components/ui/avatar.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table.jsx";

const SKILLS = [
  { key: "SWORDSMANSHIP", label: "Swordsmanship", icon: Swords },
  { key: "CANNON_GUNNERY", label: "Cannon Gunnery", icon: Crosshair },
  { key: "NAVIGATION", label: "Navigation", icon: Compass },
  { key: "RIGGING", label: "Rigging", icon: Anchor },
  { key: "STEALTH", label: "Stealth", icon: Ghost },
  { key: "MEDICINE", label: "Medicine", icon: BriefcaseMedical },
];

export default function SkillsMatrix() {
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
      console.error("Failed to load skills matrix:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSkillRating = (pirate, skillKey) => {
    if (!pirate.skills) return 50;
    const found = pirate.skills.find((s) => s.skillName === skillKey);
    // Rating in backend is 1-10 -> map to 10-100 for display
    return found ? found.rating * 10 : 50;
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sc text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-yellow-300">
            Skills & Matrix
          </h1>
          <p className="text-sm font-garamond text-slate-400 italic">
            "Track crew skills and proficiencies across every tactical discipline."
          </p>
        </div>
        <Button onClick={loadData} variant="outline" size="sm" className="font-sc gap-2 text-xs">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Matrix
        </Button>
      </div>

      {/* Skills Matrix Table Card */}
      <Card className="glass-panel border-white/10 overflow-hidden shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead className="w-56 font-sc text-xs text-amber-200">Pirate</TableHead>
              {SKILLS.map((s) => {
                const Icon = s.icon;
                return (
                  <TableHead key={s.key} className="text-center font-sc text-xs text-slate-300">
                    <div className="flex flex-col items-center gap-1">
                      <Icon className="w-4 h-4 text-amber-400/80" />
                      <span>{s.label}</span>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16 text-slate-400 font-garamond italic">
                  Compiling combat assessments...
                </TableCell>
              </TableRow>
            ) : pirates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16 text-slate-400 font-garamond italic">
                  No pirates recorded in the fleet manifest.
                </TableCell>
              </TableRow>
            ) : (
              pirates.map((pirate) => {
                // Find highest skill for pirate
                let maxVal = -1;
                SKILLS.forEach((s) => {
                  const val = getSkillRating(pirate, s.key);
                  if (val > maxVal) maxVal = val;
                });

                return (
                  <TableRow key={pirate.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Pirate Identity */}
                    <TableCell>
                      <Link
                        to={`/admin/crew/${pirate.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <Avatar
                          src={pirate.avatarUrl}
                          alt={pirate.name}
                          fallback={pirate.name ? pirate.name[0] : "P"}
                          className="w-9 h-9 border-amber-500/20"
                        />
                        <div>
                          <span className="font-sc font-medium text-sm text-slate-200 group-hover:text-amber-300 transition-colors">
                            {pirate.name}
                          </span>
                          <div className="text-[10px] text-amber-400/70 font-mono">
                            {pirate.pirateRole?.replace("_", " ")}
                          </div>
                        </div>
                      </Link>
                    </TableCell>

                    {/* Skill Rating Cells */}
                    {SKILLS.map((s) => {
                      const rating = getSkillRating(pirate, s.key);
                      const isTop = rating === maxVal && rating >= 80;

                      return (
                        <TableCell key={s.key} className="text-center">
                          <div className="inline-flex items-center justify-center min-w-[50px] py-1 px-2 rounded-lg font-mono text-xs font-bold transition-all"
                            style={{
                              backgroundColor: isTop 
                                ? "rgba(16, 185, 129, 0.18)" 
                                : rating >= 70 
                                ? "rgba(56, 189, 248, 0.1)" 
                                : "rgba(255, 255, 255, 0.02)",
                              color: isTop 
                                ? "#34d399" 
                                : rating >= 70 
                                ? "#38bdf8" 
                                : rating >= 50 
                                ? "#cbd5e1" 
                                : "#94a3b8",
                              border: isTop ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid transparent"
                            }}
                          >
                            {rating}
                            {isTop && <Sparkles className="w-2.5 h-2.5 ml-1 text-emerald-400" />}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
