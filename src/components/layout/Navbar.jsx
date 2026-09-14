import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { 
  Skull, 
  LayoutDashboard, 
  Users, 
  Crosshair, 
  HeartPulse, 
  Compass, 
  LogOut, 
  LogIn, 
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, userEmail, role, logout } = useAuth();

  const navLinks = [
    { name: "Command Center", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Crew Roster", path: "/admin/crew", icon: Users },
    { name: "Skills & Matrix", path: "/admin/skills", icon: Crosshair },
    { name: "Vitals & Health", path: "/admin/vitals", icon: HeartPulse },
    { name: "Mission Planner", path: "/admin/missions", icon: Compass },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
      {/* Pill-Shaped Glassmorphism Navbar */}
      <nav className="pointer-events-auto flex items-center justify-between px-5 py-3 rounded-full glass-pill border border-amber-500/25 shadow-[0_15px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300">
        
        {/* Brand Logo & Title */}
        <Link 
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform duration-300">
            <Skull className="w-5 h-5 text-neutral-950 stroke-[2.2]" />
            <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-ping opacity-20 pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="font-sc text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 leading-none">
              CREWCOMMAND
            </span>
            <span className="text-[10px] font-garamond italic text-amber-400/70 tracking-widest uppercase">
              BlackFlag HQ
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        {isAuthenticated && isAdmin && (
          <div className="hidden lg:flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-200 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                  <span className="font-sc text-xs tracking-wider">{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Center Nav Link for Crew member */}
        {isAuthenticated && !isAdmin && (
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/crew/dashboard"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-sc"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>My Quarters</span>
            </Link>
          </div>
        )}

        {/* Center Nav Links for Public Visitors */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/5">
            <Link
              to="/"
              className={`px-3.5 py-1.5 rounded-full text-xs font-sc font-medium tracking-wide transition-all ${
                location.pathname === "/"
                  ? "bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              Home
            </Link>
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-full text-xs font-sc font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 tracking-wide transition-all"
            >
              Command Deck
            </Link>
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-full text-xs font-sc font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 tracking-wide transition-all"
            >
              Crew Manifest
            </Link>
          </div>
        )}

        {/* Right Section: User Pill & Action */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              {/* User Profile Pill */}
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-900/70 border border-amber-500/20 shadow-inner">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xs font-bold text-black font-sc shadow-sm">
                  {isAdmin ? "⚓" : "🏴‍☠️"}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-sc font-medium text-slate-200 truncate max-w-[120px]">
                    {isAdmin ? "Captain Jack" : userEmail?.split("@")[0]}
                  </span>
                  <span className="text-[9px] text-amber-400/80 uppercase font-mono">
                    {role || "CREW"}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Abandon Ship (Logout)"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-100 transition-all active:scale-95 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="default" className="rounded-full px-5 text-xs font-sc font-semibold">
                <LogIn className="w-3.5 h-3.5" />
                Board Ship
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
