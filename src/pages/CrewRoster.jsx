import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  fetchPiratesApi, 
  createPirateApi, 
  updatePirateVitalsApi, 
  dischargePirateApi 
} from "@/api/endpoints.jsx";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Filter, 
  ShieldCheck, 
  Activity, 
  AlertCircle,
  Skull,
  UserPlus
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Avatar } from "@/components/ui/avatar.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog.jsx";

const ROLES = [
  "CAPTAIN",
  "QUARTERMASTER",
  "BOSUN",
  "MASTER_GUNNER",
  "LOOKOUT",
  "SHIPWRIGHT",
  "DECKHAND",
];

export default function CrewRoster() {
  const navigate = useNavigate();
  const [pirates, setPirates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Add Pirate Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPirate, setNewPirate] = useState({
    name: "",
    email: "",
    password: "Password123!",
    pirateRole: "DECKHAND",
  });
  const [addError, setAddError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Vitals Edit Modal
  const [isVitalsOpen, setIsVitalsOpen] = useState(false);
  const [selectedPirate, setSelectedPirate] = useState(null);
  const [vitalsData, setVitalsData] = useState({ healthHp: 100, scurvyLevel: 0, morale: 100 });

  const loadPirates = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (roleFilter) params.role = roleFilter;
      const res = await fetchPiratesApi(params);
      if (res.data && res.data.success) {
        setPirates(res.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load pirates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPirates();
  }, [roleFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadPirates();
  };

  const getStatus = (p) => {
    if (!p.active) return { label: "Discharged", variant: "secondary" };
    if ((p.healthHp || 0) < 50 || (p.scurvyLevel || 0) > 60) return { label: "Critical", variant: "destructive" };
    if ((p.healthHp || 0) < 70 || (p.morale || 0) < 50) return { label: "Rest", variant: "warning" };
    return { label: "Ready", variant: "success" };
  };

  const filteredPirates = pirates.filter((p) => {
    if (!statusFilter) return true;
    const status = getStatus(p);
    return status.label.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleCreatePirate = async (e) => {
    e.preventDefault();
    setAddError("");
    setIsSubmitting(true);
    try {
      const res = await createPirateApi(newPirate);
      if (res.data?.success) {
        setIsAddOpen(false);
        setNewPirate({ name: "", email: "", password: "Password123!", pirateRole: "DECKHAND" });
        loadPirates();
      } else {
        setAddError(res.data?.message || "Failed to muster pirate.");
      }
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to create pirate.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenVitals = (pirate) => {
    setSelectedPirate(pirate);
    setVitalsData({
      healthHp: pirate.healthHp || 100,
      scurvyLevel: pirate.scurvyLevel || 0,
      morale: pirate.morale || 100,
    });
    setIsVitalsOpen(true);
  };

  const handleSaveVitals = async () => {
    if (!selectedPirate) return;
    try {
      await updatePirateVitalsApi(selectedPirate.id, vitalsData);
      setIsVitalsOpen(false);
      loadPirates();
    } catch (err) {
      alert("Failed to update vitals: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDischarge = async (id, name) => {
    if (window.confirm(`Are you certain you wish to maroon / discharge ${name}?`)) {
      try {
        await dischargePirateApi(id);
        loadPirates();
      } catch (err) {
        alert("Discharge failed: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header matching Reference Image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sc text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-yellow-300">
            Crew Roster
          </h1>
          <p className="text-sm font-garamond text-slate-400 italic">
            "Manage your pirates and their roles."
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsAddOpen(true)}
            variant="default"
            className="rounded-full px-5 gap-2 font-sc font-semibold"
          >
            <Plus className="w-4 h-4" />
            + Add Pirate
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card className="glass-panel border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search pirates by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-black/40 border-white/10 text-xs"
            />
          </form>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 rounded-xl bg-black/50 border border-white/10 px-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-sc"
            >
              <option value="">All Roles</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ")}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl bg-black/50 border border-white/10 px-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-sc"
            >
              <option value="">All Status</option>
              <option value="Ready">Ready</option>
              <option value="Rest">Rest</option>
              <option value="Critical">Critical</option>
            </select>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={loadPirates}
              className="rounded-xl text-xs font-sc"
            >
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Roster Data Table */}
      <Card className="glass-panel border-white/10 overflow-hidden shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-40">Health</TableHead>
              <TableHead className="w-40">Morale</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPirates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-400 font-garamond italic">
                  {loading ? "Calling the deckhands..." : "No crew members matched the manifest search."}
                </TableCell>
              </TableRow>
            ) : (
              filteredPirates.map((pirate) => {
                const status = getStatus(pirate);
                return (
                  <TableRow key={pirate.id} className="hover:bg-white/[0.03] transition-colors">
                    <TableCell>
                      <Avatar
                        src={pirate.avatarUrl}
                        alt={pirate.name}
                        fallback={pirate.name ? pirate.name[0] : "P"}
                        className="w-10 h-10 border-amber-500/30"
                      />
                    </TableCell>
                    <TableCell className="font-sc font-medium text-slate-200">
                      <Link
                        to={`/admin/crew/${pirate.id}`}
                        className="hover:text-amber-300 transition-colors"
                      >
                        {pirate.name}
                      </Link>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {pirate.email || `id: #${pirate.id}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="glass" className="font-sc text-[11px] uppercase tracking-wider">
                        {pirate.pirateRole?.replace("_", " ") || "CREW"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-rose-400">{pirate.healthHp || 0} HP</span>
                        </div>
                        <Progress
                          value={pirate.healthHp || 0}
                          color={pirate.healthHp > 70 ? "emerald" : pirate.healthHp > 40 ? "amber" : "rose"}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-cyan-400">{pirate.morale || 0}%</span>
                        </div>
                        <Progress
                          value={pirate.morale || 0}
                          color={pirate.morale > 70 ? "cyan" : pirate.morale > 40 ? "amber" : "rose"}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="font-sc text-[10px] uppercase">
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link to={`/admin/crew/${pirate.id}`}>
                          <button
                            title="Inspect Profile"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleOpenVitals(pirate)}
                          title="Tweak Vitals"
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDischarge(pirate.id, pirate.name)}
                          title="Discharge Pirate"
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add Pirate Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Muster New Pirate</DialogTitle>
            <DialogDescription>
              Enlist a new member into the BlackFlag fleet. An invitation token will be generated.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePirate} className="space-y-4">
            {addError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
                {addError}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-sc text-amber-200">Pirate Name</label>
              <Input
                required
                placeholder="e.g. Anne Storm, Black Tom"
                value={newPirate.name}
                onChange={(e) => setNewPirate({ ...newPirate, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-sc text-amber-200">Account Email</label>
              <Input
                type="email"
                required
                placeholder="pirate@blackflag.com"
                value={newPirate.email}
                onChange={(e) => setNewPirate({ ...newPirate, email: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-sc text-amber-200">Temporary Password</label>
              <Input
                type="password"
                required
                value={newPirate.password}
                onChange={(e) => setNewPirate({ ...newPirate, password: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-sc text-amber-200">Ship Role</label>
              <select
                value={newPirate.pirateRole}
                onChange={(e) => setNewPirate({ ...newPirate, pirateRole: e.target.value })}
                className="w-full h-10 rounded-xl bg-black/50 border border-white/15 px-3 text-sm text-slate-200 font-sc"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsAddOpen(false)}
                className="font-sc"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="font-sc font-bold"
              >
                {isSubmitting ? "Signing Articles..." : "Enlist Pirate"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Vitals Modal */}
      <Dialog open={isVitalsOpen} onOpenChange={setIsVitalsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Vitals — {selectedPirate?.name}</DialogTitle>
            <DialogDescription>
              Adjust health points, scurvy progression, and crew morale.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <div className="flex justify-between text-xs font-sc mb-1 text-slate-300">
                <span>Health HP: {vitalsData.healthHp}/100</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vitalsData.healthHp}
                onChange={(e) => setVitalsData({ ...vitalsData, healthHp: Number(e.target.value) })}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-sc mb-1 text-slate-300">
                <span>Scurvy Level: {vitalsData.scurvyLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vitalsData.scurvyLevel}
                onChange={(e) => setVitalsData({ ...vitalsData, scurvyLevel: Number(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-sc mb-1 text-slate-300">
                <span>Morale: {vitalsData.morale}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vitalsData.morale}
                onChange={(e) => setVitalsData({ ...vitalsData, morale: Number(e.target.value) })}
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
