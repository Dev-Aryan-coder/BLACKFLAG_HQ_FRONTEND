import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import SidebarDock from "@/components/layout/SidebarDock.jsx";
import Home from "@/pages/Home.jsx";
import Login from "@/pages/Login.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";
import ResetPassword from "@/pages/ResetPassword.jsx";
import VerifyOtp from "@/pages/VerifyOtp.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import CrewRoster from "@/pages/CrewRoster.jsx";
import PirateProfile from "@/pages/PirateProfile.jsx";
import SkillsMatrix from "@/pages/SkillsMatrix.jsx";
import VitalsHealth from "@/pages/VitalsHealth.jsx";
import MissionPlanner from "@/pages/MissionPlanner.jsx";
import CrewDashboard from "@/pages/CrewDashboard.jsx";
import GameArena from "@/pages/GameArena.jsx";

// Background Assets
import bgDashboard from "@/assets/backgrounds/bg-dashboard.jpg";
import bgCrewRoster from "@/assets/backgrounds/bg-crew-roster.jpg";
import bgPirateProfile from "@/assets/backgrounds/bg-pirate-profile.jpg";
import bgSkillsMatrix from "@/assets/backgrounds/bg-skills-matrix.jpg";
import bgVitalsHealth from "@/assets/backgrounds/bg-vitals-health.jpg";
import bgMissionPlanner from "@/assets/backgrounds/bg-mission-planner.jpg";
import bgMaster from "@/assets/backgrounds/bg-master.jpg";

// Protected Route Component for Admin
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/crew/dashboard" replace />;
  return children;
}

// Protected Route Component for Authenticated Crew/Admin
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function RootRedirect() {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/crew/dashboard" replace />;
}

function BackgroundLayer() {
  const location = useLocation();
  const path = location.pathname;

  let currentBg = bgDashboard;
  if (path.startsWith("/admin/crew/")) {
    currentBg = bgPirateProfile;
  } else if (path === "/admin/crew") {
    currentBg = bgCrewRoster;
  } else if (path === "/admin/skills") {
    currentBg = bgSkillsMatrix;
  } else if (path === "/admin/vitals") {
    currentBg = bgVitalsHealth;
  } else if (path === "/admin/missions") {
    currentBg = bgMissionPlanner;
  } else if (path === "/login" || path === "/forgot-password" || path === "/reset-password" || path === "/verify-otp") {
    currentBg = bgMaster;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Background Image */}
      <img
        src={currentBg}
        alt="Pirate Horizon"
        className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.18] saturate-[1.1] transition-all duration-700 ease-out scale-105"
      />
      {/* Dark Vignette and Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-black/40 to-[#06080d]/80" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      
      {/* Liquid Morphism Ambient Blobs */}
      <div className="liquid-blob-1 top-10 left-10 w-96 h-96 bg-amber-500/15" />
      <div className="liquid-blob-2 bottom-10 right-10 w-[30rem] h-[30rem] bg-cyan-500/15" />
    </div>
  );
}

function LayoutContent() {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const isPublicPage = ["/", "/login", "/forgot-password", "/reset-password", "/verify-otp"].includes(location.pathname);

  return (
    <div className="min-h-screen relative text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Wallpaper Layer */}
      <BackgroundLayer />

      {/* Floating Pill Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main App Layout: Left Sidebar Dock + Main Content */}
      <div className="relative z-10 flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex gap-6">
        {/* Left Navigation Dock matching Reference Image */}
        {isAuthenticated && isAdmin && !isPublicPage && <SidebarDock />}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* Admin Fleet Management Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/crew"
              element={
                <AdminRoute>
                  <CrewRoster />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/crew/:id"
              element={
                <AdminRoute>
                  <PirateProfile />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/skills"
              element={
                <AdminRoute>
                  <SkillsMatrix />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/vitals"
              element={
                <AdminRoute>
                  <VitalsHealth />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/missions"
              element={
                <AdminRoute>
                  <MissionPlanner />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/game"
              element={
                <AdminRoute>
                  <GameArena />
                </AdminRoute>
              }
            />

            {/* Crew Self-Service Route */}
            <Route
              path="/crew/dashboard"
              element={
                <ProtectedRoute>
                  <CrewDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Liquid Glass Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-xs font-garamond text-slate-400/80">
        <p>© 2026 BlackFlag HQ — Fleet Operations & Command Deck. Under the Articles of War.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
