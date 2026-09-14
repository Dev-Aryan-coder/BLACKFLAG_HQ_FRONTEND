import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  fetchPirateByIdApi, 
  updatePirateApi, 
  updatePirateVitalsApi, 
  updatePirateSkillsApi, 
  dischargePirateApi 
} from "@/api/endpoints.jsx";
import { 
  ArrowLeft, 
  Heart, 
  Smile, 
  ShieldAlert, 
  Swords, 
  Crosshair, 
  Compass, 
  Anchor, 
  Ghost, 
  BriefcaseMedical, 
  Edit3, 
  UserMinus, 
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog.jsx";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const SKILL_ICONS = {
  SWORDSMANSHIP: Swords,
  CANNON_GUNNERY: Crosshair,
  NAVIGATION: Compass,
  RIGGING: Anchor,
  STEALTH: Ghost,
  MEDICINE: BriefcaseMedical,
};

const ALL_ROLES = [
  "CAPTAIN",
  "QUARTERMASTER",
  "BOSUN",
  "MASTER_GUNNER",
  "LOOKOUT",
  "SHIPWRIGHT",
  "DECKHAND",
];

export default function PirateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pirate, setPirate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Role dialog
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  // Skills dialog
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [skillRatings, setSkillRatings] = useState({});

  // Vitals dialog
  const [isVitalsOpen, setIsVitalsOpen] = useState(false);
  const [vitals, setVitals] = useState({ healthHp: 100, scurvyLevel: 0, morale: 100 });

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchPirateByIdApi(id);
      if (res.data?.success) {
        const p = res.data.data;
        setPirate(p);
        setSelectedRole(p.pirateRole || "DECKHAND");
        setVitals({
          healthHp: p.healthHp || 100,
          scurvyLevel: p.scurvyLevel || 0,
          morale: p.morale || 100,
        });

        // Initialize skills
        const initialRatings = {
          SWORDSMANSHIP: 5,
          CANNON_GUNNERY: 5,
          NAVIGATION: 5,
          RIGGING: 5,
          STEALTH: 5,
          MEDICINE: 5,
        };
        if (p.skills && p.skills.length > 0) {
          p.skills.forEach((s) => {
            initialRatings[s.skillName] = s.rating;
          });
        }
        setSkillRatings(initialRatings);
      } else {
        setError(res.data?.message || "Pirate not found");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pirate details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadProfile();
  }, [id]);

  const handleSaveRole = async () => {
    try {
      await updatePirateApi(id, { pirateRole: selectedRole });
      setIsRoleOpen(false);
      loadProfile();
    } catch (err) {
      alert("Role update failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleSaveVitals = async () => {
    try {
      await updatePirateVitalsApi(id, vitals);
      setIsVitalsOpen(false);
      loadProfile();
    } catch (err) {
      alert("Vitals update failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleSaveSkills = async () => {
    try {
      await updatePirateSkillsApi(id, skillRatings);
      setIsSkillsOpen(false);
      loadProfile();
    } catch (err) {
      alert("Skills update failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDischarge = async () => {
    if (window.confirm(`Are you sure you want to discharge ${pirate?.name}?`)) {
      try {
        await dischargePirateApi(id);
        navigate("/admin/crew");
      } catch (err) {
        alert("Discharge failed: " + (err.response?.data?.message || err.message));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
        <p className="font-sc text-sm text-slate-400">Loading pirate quarters...</p>
      </div>
    );
  }

  if (error || !pirate) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="font-sc text-2xl text-rose-300">Manifest Error</h2>
        <p className="font-garamond text-slate-400">{error || "Pirate record unavailable."}</p>
        <Button onClick={() => navigate("/admin/crew")} variant="default" className="font-sc">
          Back to Crew Roster
        </Button>
      </div>
    );
  }

  // Format skills for Radar chart
  const radarData = Object.entries(skillRatings).map(([key, value]) => ({
    skill: key.replace("_", " ").slice(0, 9),
    rating: (value || 1) * 10,
    fullMark: 100,
  }));

  const getScurvyLabel = (val) => {
    if (val < 30) return { label: "LOW", color: "text-emerald-400" };
    if (val < 60) return { label: "MODERATE", color: "text-amber-400" };
    return { label: "CRITICAL", color: "text-rose-400" };
  };

  const scurvyInfo = getScurvyLabel(pirate.scurvyLevel || 0);

  return (
    <div className="space-y-6 pb-20">
      {/* Back button & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/crew")}
          className="p-2.5 rounded-full glass-panel hover:bg-white/10 text-amber-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-sc text-3xl font-bold text-amber-100">Pirate Profile</h1>
          <p className="text-sm font-garamond text-slate-400 italic">
            "View and manage detailed pirate information."
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout matching View 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pirate Portrait & Vitals Card (5 cols) */}
        <Card className="glass-panel-glow border-amber-500/30 lg:col-span-5 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Portrait and Identity Header */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0 bg-slate-900">
                {pirate.avatarUrl ? (
                  <img
                    src={pirate.avatarUrl}
                    alt={pirate.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-sc text-4xl text-amber-300">
                    ☠
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left space-y-1.5">
                <h2 className="font-sc text-2xl font-bold text-slate-100 tracking-wide">
                  {pirate.name}
                </h2>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  <Badge variant="glass" className="font-sc text-xs text-amber-300">
                    {pirate.pirateRole?.replace("_", " ")}
                  </Badge>
                  <Badge variant="success" className="text-[10px] font-mono">
                    Ready
                  </Badge>
                </div>
                <p className="font-garamond text-xs text-slate-400 italic max-w-xs pt-1">
                  "The horizon is not the limit, it's just the beginning of the haul."
                </p>
              </div>
            </div>

            {/* Vitals Summary List */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              {/* Health */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sc">
                  <span className="flex items-center gap-1.5 text-rose-300">
                    <Heart className="w-3.5 h-3.5 text-rose-400" /> Health
                  </span>
                  <span className="font-mono text-slate-200">{pirate.healthHp || 0}/100</span>
                </div>
                <Progress value={pirate.healthHp || 0} color="emerald" />
              </div>

              {/* Scurvy Level */}
              <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-black/40 border border-white/5">
                <span className="flex items-center gap-1.5 text-xs font-sc text-amber-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Scurvy Level
                </span>
                <span className={`text-xs font-mono font-bold ${scurvyInfo.color}`}>
                  {scurvyInfo.label} ({pirate.scurvyLevel || 0}%)
                </span>
              </div>

              {/* Morale */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sc">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Smile className="w-3.5 h-3.5 text-cyan-400" /> Morale
                  </span>
                  <span className="font-mono text-slate-200">{pirate.morale || 0}%</span>
                </div>
                <Progress value={pirate.morale || 0} color="cyan" />
              </div>
            </div>
          </div>

          {/* Action Buttons matching reference image */}
          <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsVitalsOpen(true)}
              className="text-xs font-sc gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Vitals
            </Button>
            <Button
              size="sm"
              variant="glass"
              onClick={() => setIsRoleOpen(true)}
              className="text-xs font-sc"
            >
              Change Role
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDischarge}
              className="text-xs font-sc gap-1"
            >
              <UserMinus className="w-3.5 h-3.5" /> Discharge
            </Button>
          </div>
        </Card>

        {/* Right Column: Skills Ratings & Radar Chart (7 cols) */}
        <Card className="glass-panel border-white/10 lg:col-span-7 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <CardTitle className="text-xl text-amber-200">Skills & Proficiencies</CardTitle>
                <CardDescription>Rating between 1 and 10 per specialty</CardDescription>
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={() => setIsSkillsOpen(true)}
                className="font-sc text-xs"
              >
                Tweak Skills
              </Button>
            </div>

            {/* Skills Bars Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(skillRatings).map(([skillKey, rating]) => {
                const Icon = SKILL_ICONS[skillKey] || Swords;
                const percent = (rating || 0) * 10;
                return (
                  <div
                    key={skillKey}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-sc text-slate-300 uppercase">
                        <Icon className="w-4 h-4 text-amber-400" />
                        {skillKey.replace("_", " ")}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {percent} / 100
                      </span>
                    </div>
                    <Progress
                      value={percent}
                      color={percent >= 70 ? "emerald" : percent >= 40 ? "amber" : "rose"}
                    />
                  </div>
                );
              })}
            </div>

            {/* Radar Chart Visual */}
            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <PolarRadiusAxis domain={[0, 100]} stroke="rgba(255,255,255,0.05)" />
                  <Radar
                    name="Skills"
                    dataKey="rating"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

      </div>

      {/* Change Role Dialog */}
      <Dialog open={isRoleOpen} onOpenChange={setIsRoleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Shipboard Role</DialogTitle>
            <DialogDescription>
              Promote or reassign {pirate.name} to a new post in the fleet.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full h-11 rounded-xl bg-black/60 border border-white/20 px-3 text-sm text-slate-200 font-sc"
            >
              {ALL_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsRoleOpen(false)} className="font-sc">
              Cancel
            </Button>
            <Button variant="default" onClick={handleSaveRole} className="font-sc font-bold">
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Skills Dialog */}
      <Dialog open={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Train Pirate Skills</DialogTitle>
            <DialogDescription>
              Adjust proficiency ratings (1 to 10) for {pirate.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3 max-h-[60vh] overflow-y-auto pr-2">
            {Object.keys(skillRatings).map((skillName) => (
              <div key={skillName} className="space-y-1">
                <div className="flex justify-between text-xs font-sc text-slate-300">
                  <span>{skillName.replace("_", " ")}</span>
                  <span className="font-mono text-amber-300 font-bold">{skillRatings[skillName]}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={skillRatings[skillName]}
                  onChange={(e) =>
                    setSkillRatings({
                      ...skillRatings,
                      [skillName]: Number(e.target.value),
                    })
                  }
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsSkillsOpen(false)} className="font-sc">
              Cancel
            </Button>
            <Button variant="default" onClick={handleSaveSkills} className="font-sc font-bold">
              Save Skills
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Vitals Dialog */}
      <Dialog open={isVitalsOpen} onOpenChange={setIsVitalsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tweak Vitals</DialogTitle>
            <DialogDescription>
              Adjust health, scurvy level, and morale.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <div className="flex justify-between text-xs font-sc text-slate-300 mb-1">
                <span>Health HP: {vitals.healthHp}/100</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vitals.healthHp}
                onChange={(e) => setVitals({ ...vitals, healthHp: Number(e.target.value) })}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-sc text-slate-300 mb-1">
                <span>Scurvy: {vitals.scurvyLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vitals.scurvyLevel}
                onChange={(e) => setVitals({ ...vitals, scurvyLevel: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-sc text-slate-300 mb-1">
                <span>Morale: {vitals.morale}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vitals.morale}
                onChange={(e) => setVitals({ ...vitals, morale: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsVitalsOpen(false)} className="font-sc">
              Cancel
            </Button>
            <Button variant="default" onClick={handleSaveVitals} className="font-sc font-bold">
              Save Vitals
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
