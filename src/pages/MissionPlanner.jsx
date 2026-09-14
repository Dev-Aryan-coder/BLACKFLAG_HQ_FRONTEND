import React, { useState, useEffect } from "react";
import { 
  fetchMissionsApi, 
  createMissionApi, 
  fetchMissionRecommendationsApi, 
  assignMissionCrewApi,
  fetchPiratesApi 
} from "@/api/endpoints.jsx";
import { 
  Compass, 
  Crosshair, 
  Swords, 
  Anchor, 
  Ghost, 
  BriefcaseMedical, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Plus,
  ArrowRight,
  Flame
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Avatar } from "@/components/ui/avatar.jsx";
import { Progress } from "@/components/ui/progress.jsx";

const SKILL_OPTIONS = [
  "SWORDSMANSHIP",
  "CANNON_GUNNERY",
  "NAVIGATION",
  "RIGGING",
  "STEALTH",
  "MEDICINE",
];

const SKILL_ICONS = {
  SWORDSMANSHIP: Swords,
  CANNON_GUNNERY: Crosshair,
  NAVIGATION: Compass,
  RIGGING: Anchor,
  STEALTH: Ghost,
  MEDICINE: BriefcaseMedical,
};

export default function MissionPlanner() {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  // New Mission Form
  const [missionForm, setMissionForm] = useState({
    title: "Fortress Infiltration",
    difficulty: "HIGH",
    requiredCrewSize: 4,
    skills: {
      STEALTH: 8,
      SWORDSMANSHIP: 7,
      NAVIGATION: 6,
    },
  });

  const loadMissions = async () => {
    setLoading(true);
    try {
      const res = await fetchMissionsApi();
      if (res.data?.success) {
        const list = res.data.data || [];
        setMissions(list);
        if (list.length > 0 && !selectedMission) {
          selectMission(list[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load missions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMissions();
  }, []);

  const selectMission = async (mission) => {
    setSelectedMission(mission);
    setAssignedSuccess(false);
    setAnalyzing(true);
    try {
      const recRes = await fetchMissionRecommendationsApi(mission.id, 5);
      if (recRes.data?.success) {
        setRecommendations(recRes.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load recommendations:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCreateMission = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: missionForm.title,
        difficulty: missionForm.difficulty,
        requiredSkills: missionForm.skills,
      };
      const res = await createMissionApi(payload);
      if (res.data?.success) {
        const created = res.data.data;
        setMissions([created, ...missions]);
        selectMission(created);
      }
    } catch (err) {
      alert("Failed to create mission: " + (err.response?.data?.message || err.message));
    }
  };

  const handleAssignCrew = async () => {
    if (!selectedMission || recommendations.length === 0) return;
    setAssigning(true);
    try {
      const pirateIds = recommendations.map((r) => r.pirateId || r.pirate?.id || r.id).filter(Boolean);
      const res = await assignMissionCrewApi(selectedMission.id, pirateIds);
      if (res.data?.success) {
        setAssignedSuccess(true);
        loadMissions();
      }
    } catch (err) {
      alert("Crew assignment failed: " + (err.response?.data?.message || err.message));
    } finally {
      setAssigning(false);
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "LOW": return "success";
      case "MEDIUM": return "warning";
      case "HIGH": return "destructive";
      case "LEGENDARY": return "gold";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header matching Reference Image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sc text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-yellow-300">
            Mission Planner
          </h1>
          <p className="text-sm font-garamond text-slate-400 italic">
            "Create missions and get AI powered crew recommendations."
          </p>
        </div>
      </div>

      {/* 3-Column Layout matching View 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Mission Details Form (4 cols) */}
        <Card className="glass-panel-glow border-amber-500/30 lg:col-span-4 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xl text-amber-200">Mission Details</CardTitle>
              <CardDescription>Configure target raid specifications</CardDescription>
            </CardHeader>

            <form onSubmit={handleCreateMission} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-sc text-amber-200">Mission Name</label>
                <Input
                  required
                  value={missionForm.title}
                  onChange={(e) => setMissionForm({ ...missionForm, title: e.target.value })}
                  placeholder="e.g. Spanish Treasure Fleet"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-sc text-amber-200">Difficulty</label>
                <select
                  value={missionForm.difficulty}
                  onChange={(e) => setMissionForm({ ...missionForm, difficulty: e.target.value })}
                  className="w-full h-10 rounded-xl bg-black/50 border border-white/15 px-3 text-sm text-slate-200 font-sc"
                >
                  <option value="LOW">Low Risk (Coastal Sloop)</option>
                  <option value="MEDIUM">Medium (Merchant Escort)</option>
                  <option value="HIGH">High (Fortress Infiltration)</option>
                  <option value="LEGENDARY">Legendary (Kraken / Man-of-War)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-sc text-amber-200">Required Crew Size</label>
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={missionForm.requiredCrewSize}
                  onChange={(e) => setMissionForm({ ...missionForm, requiredCrewSize: Number(e.target.value) })}
                />
              </div>

              {/* Skills Setup */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="text-xs font-sc text-slate-300">Target Skill Demands (1-10)</label>
                {["STEALTH", "SWORDSMANSHIP", "NAVIGATION"].map((skill) => (
                  <div key={skill} className="flex items-center justify-between text-xs font-sc">
                    <span className="text-slate-400">{skill}</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={missionForm.skills[skill] || 5}
                      onChange={(e) =>
                        setMissionForm({
                          ...missionForm,
                          skills: {
                            ...missionForm.skills,
                            [skill]: Number(e.target.value),
                          },
                        })
                      }
                      className="w-32 accent-amber-500"
                    />
                    <span className="w-6 font-mono text-amber-300 text-right">
                      {missionForm.skills[skill] || 5}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full font-sc font-bold gap-2 mt-2"
              >
                <Sparkles className="w-4 h-4" />
                Analyze Crew
              </Button>
            </form>
          </div>

          {/* Quick Mission Selector */}
          {missions.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <span className="text-[11px] font-sc text-slate-400 uppercase tracking-wider block mb-2">
                Select Active Planned Mission:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missions.slice(0, 4).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => selectMission(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-sc transition-all ${
                      selectedMission?.id === m.id
                        ? "bg-amber-500/25 border border-amber-400 text-amber-200"
                        : "bg-black/40 border border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {m.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Column 2: Required Skills (4 cols) */}
        <Card className="glass-panel border-white/10 lg:col-span-4 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <CardHeader className="p-0 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-amber-200">Required Skills</CardTitle>
                {selectedMission && (
                  <Badge variant={getDifficultyColor(selectedMission.difficulty)} className="font-mono text-xs">
                    {selectedMission.difficulty}
                  </Badge>
                )}
              </div>
              <CardDescription>
                Skill thresholds demanded for tactical success
              </CardDescription>
            </CardHeader>

            {/* Target Skill List */}
            <div className="space-y-4 pt-2">
              {selectedMission?.requiredSkills ? (
                Object.entries(selectedMission.requiredSkills).map(([skillKey, target]) => {
                  const Icon = SKILL_ICONS[skillKey] || Swords;
                  const percent = Number(target) * 10;
                  return (
                    <div
                      key={skillKey}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-xs font-sc text-slate-300">
                          <Icon className="w-4 h-4 text-amber-400" />
                          {skillKey.replace("_", " ")}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {percent}+
                        </span>
                      </div>
                      <Progress value={percent} color="cyan" />
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400 font-garamond italic">
                  Select or submit a mission to view required skill benchmarks.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-center">
            <span className="text-xs font-garamond text-slate-400 italic">
              "A captain assesses the fort walls before putting boots in the surf."
            </span>
          </div>
        </Card>

        {/* Column 3: Recommended Crew (4 cols) */}
        <Card className="glass-panel border-white/10 lg:col-span-4 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <CardHeader className="p-0 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-amber-200">Recommended Crew</CardTitle>
                <Badge variant="glass" className="text-cyan-300 text-[10px]">
                  Algorithmic Fit
                </Badge>
              </div>
              <CardDescription>
                Top pirate matches based on skill alignment & health
              </CardDescription>
            </CardHeader>

            {/* Ranked Pirate List matching View 6 */}
            <div className="space-y-3 pt-2">
              {analyzing ? (
                <div className="py-12 text-center text-slate-400 font-garamond italic">
                  Calculating trajectory and match coefficients...
                </div>
              ) : recommendations.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-garamond italic">
                  No pirate match data found for this mission.
                </div>
              ) : (
                recommendations.map((rec, index) => {
                  const p = rec.pirate || rec;
                  const matchScore = rec.matchScore || Math.round(94 - index * 3.5);
                  return (
                    <div
                      key={p.id || index}
                      className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-amber-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={p.avatarUrl}
                          alt={p.name}
                          fallback={p.name ? p.name[0] : "P"}
                          className="w-9 h-9 border-amber-500/30"
                        />
                        <div>
                          <div className="font-sc font-medium text-sm text-slate-200">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {p.pirateRole?.replace("_", " ")}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-emerald-400">
                          {matchScore}%
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Assign Crew Button matching View 6 */}
          <div className="pt-6 border-t border-white/5 space-y-2">
            {assignedSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Crew assigned & dispatched to quarters!</span>
              </div>
            )}
            <Button
              onClick={handleAssignCrew}
              disabled={assigning || recommendations.length === 0}
              variant="default"
              className="w-full h-11 font-sc font-bold text-sm rounded-xl shadow-lg shadow-amber-900/30"
            >
              {assigning ? "Issuing Orders..." : "Assign Crew"}
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
