import React, { useState, useEffect } from "react";
import { fetchMyProfileApi, fetchMyMissionsApi, updateMyProfileApi } from "@/api/endpoints.jsx";
import { 
  Heart, 
  Smile, 
  ShieldAlert, 
  Swords, 
  Crosshair, 
  Compass, 
  Anchor, 
  Ghost, 
  BriefcaseMedical, 
  Calendar, 
  RefreshCw,
  UserCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Avatar } from "@/components/ui/avatar.jsx";
import { Progress } from "@/components/ui/progress.jsx";
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

export default function CrewDashboard() {
  const [profile, setProfile] = useState(null);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarInput, setAvatarInput] = useState("");
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, mRes] = await Promise.allSettled([
        fetchMyProfileApi(),
        fetchMyMissionsApi(),
      ]);
      if (pRes.status === "fulfilled" && pRes.value.data?.success) {
        setProfile(pRes.value.data.data);
      }
      if (mRes.status === "fulfilled" && mRes.value.data?.success) {
        setMissions(mRes.value.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load quarters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    if (!avatarInput.trim()) return;
    setIsUpdatingAvatar(true);
    try {
      await updateMyProfileApi({ avatarUrl: avatarInput.trim() });
      setAvatarInput("");
      loadData();
    } catch (err) {
      alert("Avatar update failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsUpdatingAvatar(false);
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

  if (!profile) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="font-sc text-2xl text-amber-200">Pirate Quarters</h2>
        <p className="font-garamond text-slate-400">
          No crew profile linked to this user account. If you are an officer, please check with Captain Jack.
        </p>
      </div>
    );
  }

  const radarData = (profile.skills || []).map((s) => ({
    skill: s.skillName.replace("_", " ").slice(0, 9),
    rating: s.rating * 10,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="font-sc text-3xl sm:text-4xl font-bold text-amber-100">
          My Pirate Quarters
        </h1>
        <p className="text-sm font-garamond text-slate-400 italic">
          "Your shipboard duties, vitals status, and active raid assignments."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile & Vitals Card (5 cols) */}
        <Card className="glass-panel-glow border-amber-500/30 lg:col-span-5 p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-md bg-slate-900 shrink-0">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-sc text-amber-300">
                  ☠
                </div>
              )}
            </div>
            <div>
              <h2 className="font-sc text-2xl font-bold text-slate-100">{profile.name}</h2>
              <Badge variant="glass" className="font-sc text-xs text-amber-300 mt-1">
                {profile.pirateRole?.replace("_", " ")}
              </Badge>
              <div className="text-xs text-slate-400 font-mono mt-1">{profile.email}</div>
            </div>
          </div>

          {/* Vitals */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sc">
                <span className="flex items-center gap-1.5 text-rose-300">
                  <Heart className="w-3.5 h-3.5" /> Health
                </span>
                <span className="font-mono text-slate-200">{profile.healthHp || 0}/100</span>
              </div>
              <Progress value={profile.healthHp || 0} color="emerald" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sc">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <ShieldAlert className="w-3.5 h-3.5" /> Scurvy
                </span>
                <span className="font-mono text-slate-200">{profile.scurvyLevel || 0}%</span>
              </div>
              <Progress value={profile.scurvyLevel || 0} color="amber" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sc">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Smile className="w-3.5 h-3.5" /> Morale
                </span>
                <span className="font-mono text-slate-200">{profile.morale || 0}%</span>
              </div>
              <Progress value={profile.morale || 0} color="cyan" />
            </div>
          </div>

          {/* Update Avatar Form */}
          <form onSubmit={handleUpdateAvatar} className="pt-4 border-t border-white/10 space-y-2">
            <label className="text-xs font-sc text-slate-300">Update Profile Portrait URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://..."
                value={avatarInput}
                onChange={(e) => setAvatarInput(e.target.value)}
                className="flex-1 h-9 rounded-xl bg-black/50 border border-white/10 px-3 text-xs text-slate-200"
              />
              <Button type="submit" size="sm" variant="outline" disabled={isUpdatingAvatar} className="font-sc text-xs">
                Update
              </Button>
            </div>
          </form>
        </Card>

        {/* Skills Radar & Assigned Missions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Radar Chart Card */}
          <Card className="glass-panel border-white/10 p-6">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-xl text-amber-200">My Skill Radar</CardTitle>
              <CardDescription>Evaluation by the quartermaster</CardDescription>
            </CardHeader>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <PolarRadiusAxis domain={[0, 100]} stroke="rgba(255,255,255,0.05)" />
                  <Radar name="Skills" dataKey="rating" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Assigned Missions Card */}
          <Card className="glass-panel border-white/10 p-6">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="text-xl text-amber-200">My Assigned Raids</CardTitle>
              <CardDescription>High-seas operations where you are mustering</CardDescription>
            </CardHeader>
            <div className="space-y-3 pt-2">
              {missions.length === 0 ? (
                <div className="py-8 text-center text-slate-400 font-garamond italic">
                  No active raids assigned to your watch currently. Stand by for orders.
                </div>
              ) : (
                missions.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-sc font-medium text-sm text-slate-200">{m.title}</div>
                      <div className="text-[11px] text-slate-400 font-garamond">
                        Status: <span className="text-emerald-400">{m.status}</span>
                      </div>
                    </div>
                    <Badge variant="glass" className="font-mono text-xs">
                      {m.difficulty}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
