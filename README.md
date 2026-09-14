# 🏴‍☠️ BlackFlag HQ — Fleet Command Deck (Frontend)

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-Components-161618.svg)](https://www.radix-ui.com/)
[![License](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

An immersive, state-of-the-art pirate fleet command and crew management web application built with **React 19**, **Vite**, and **Tailwind CSS**. Designed with rich transparent glassmorphism, organic liquid morphism glows, period-accurate typography (**Cormorant SC** & **Cormorant Garamond**), and an integrated 2D Canvas naval combat game: **"Defend the Black Pearl"**.

---

## 🌟 Visual Design & Core Features

### 💎 Liquid Glassmorphism & Aesthetics
- **Transparent Frosted Glass**: Ultra-high backdrop blur (`backdrop-blur-2xl`), multi-layer specular highlights, and gold-tinted border glows (`border-amber-500/30`).
- **Dynamic Ambient Blobs**: Organic radial gradients floating softly beneath the layout for a living ocean aesthetic.
- **Cinematic Route Wallpapers**: Seamless transitions between high-definition thematic pirate backgrounds matching each route (Crew Roster, Skills Matrix, Vitals Deck, Mission Planner).
- **Custom Typography**: Google Fonts **Cormorant SC** (headings, stats, nav titles) and **Cormorant Garamond** (body lore, descriptions).

### 🧭 Navigation & Layout System
- **Floating Pill Navbar**: Centered glass pill navbar with real-time session status, crew notifications, and responsive mobile drawer.
- **Adaptive Sidebar Dock (`CrewCommand`)**:
  - Direct matching to the reference UI with gold skull emblem.
  - Quick access to Dashboard, Crew Roster, Skills Matrix, Vitals & Health, and Mission Planner.
  - **Integrated Battle Station**: Dedicated game launcher directly below the Reports section featuring real-time armada alerts, high-score doubloon tracking, and an instant **Quick Play** arcade modal.

### ⚔️ "Defend the Black Pearl" Mini-Game
- **2D Canvas Naval Combat Engine**:
  - Full ship physics (throttle, drift, inertia, rudder steering).
  - Cannon batteries with multiple ammunition types: **Round Shot** (hull damage), **Chain Shot** (shreds sails), and **Grapeshot** (wipes enemy crew).
  - Supernatural captain abilities: **Mystic Sea Shield** (`X`) and **Emergency Timber Repair** (`R`).
  - Active Radar sweep, audio oscillator sound effects, smoke particle systems, and persistent doubloon score tracking via `localStorage`.
- **Play Anywhere**:
  - **Quick Play Modal**: In-page popup dialog accessible from the sidebar without leaving your current workspace.
  - **Full Arena Deck** (`/admin/game`): Dedicated cockpit view with fullscreen toggle, restart controls, and interactive tactical cheat sheets.

### 🛡️ Fleet Management Modules
1. **Crew Roster (`/admin/crew`)**: Comprehensive roster table with pirate avatars, roles (Captain, Quartermaster, Gunner, Navigator, etc.), current bounties, and quick profile inspection.
2. **Pirate Dossier (`/admin/crew/:id`)**: Individual record view displaying allegiance, health bars, inventory, and combat history.
3. **Skills & Matrix (`/admin/skills`)**: Radar visualizers and metric bars rating Navigation, Gunnery, Swordsmanship, Leadership, and Voodoo.
4. **Vitals & Health (`/admin/vitals`)**: Real-time crew wellness metrics (HP, Hunger, Morale, Scurvy risk) with emergency medical intervention triggers.
5. **Mission Planner (`/admin/missions`)**: Strategic expedition board for deploying ships, assigning specialists, and tracking active raids across the Caribbean.
6. **Crew Self-Service (`/crew/dashboard`)**: Dedicated portal for individual crewmen to inspect assigned duties and update their secret passphrases.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | React 19 | Pure functional components, hooks, Context API |
| **Bundler** | Vite 8 | Ultra-fast HMR and optimized production bundling |
| **Routing** | React Router DOM v7 | Nested routes, protected route guards (`AdminRoute`, `ProtectedRoute`) |
| **Styling** | Tailwind CSS + Vanilla CSS | Glassmorphic panel classes, liquid glow animations |
| **UI Primitives** | Radix UI + Lucide React | Dialog modals, progress bars, accessible avatars |
| **HTTP Client** | Axios | Configured with automatic `X-Auth-Token` interceptors |
| **Fonts** | Google Fonts | `Cormorant SC` & `Cormorant Garamond` |

---

## 📁 Directory Structure

```
BlackFlag_HQ/
├── public/
│   ├── game.html                 # Defend the Black Pearl standalone canvas engine
│   ├── favicon.svg               # Pirate skull favicon
│   └── icons.svg
├── src/
│   ├── api/
│   │   ├── client.jsx            # Configured Axios instance with auth interceptor
│   │   └── endpoints.jsx         # REST API URL constants
│   ├── assets/
│   │   ├── backgrounds/          # 6 Route-specific cinematic scene wallpapers
│   │   └── WhatsApp Video...     # Hero banner background video
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        # Pill-shaped floating top navigation
│   │   │   ├── SidebarDock.jsx   # Left dock with Defend the Pearl game launcher
│   │   │   └── HeroBanner.jsx    # Homepage video banner with glass overlays
│   │   └── ui/                   # Button, Card, Dialog, Badge, Input, Progress, Table, Avatar
│   ├── context/
│   │   └── AuthContext.jsx       # User credentials, token storage & role state
│   ├── pages/
│   │   ├── Home.jsx              # Landing page with video hero & feature showcase
│   │   ├── Login.jsx             # Glassmorphic credential portal with quick-login buttons
│   │   ├── ForgotPassword.jsx    # Password recovery request
│   │   ├── VerifyOtp.jsx         # OTP numeric token verification
│   │   ├── ResetPassword.jsx     # New password setter
│   │   ├── Dashboard.jsx         # Fleet command analytics & quick vitals overview
│   │   ├── CrewRoster.jsx        # Pirate roster table & enroll modal
│   │   ├── PirateProfile.jsx     # Full pirate biography & attributes
│   │   ├── SkillsMatrix.jsx      # Combat & navigational skill scores
│   │   ├── VitalsHealth.jsx      # Medical bay & wellness monitor
│   │   ├── MissionPlanner.jsx    # Expedition dispatching & crew assignments
│   │   ├── GameArena.jsx         # Full-screen "Defend the Black Pearl" cockpit
│   │   └── CrewDashboard.jsx     # Deckhand self-service view
│   ├── App.jsx                   # Route registration & dynamic wallpaper layer
│   ├── main.jsx                  # React DOM entry point
│   └── index.css                 # Glassmorphic utilities & liquid glow keyframes
└── vite.config.js
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher
- **Spring Boot Backend**: Running on `http://localhost:8080` ([BLACKFLAG_HQ_BACKEND](https://github.com/Dev-Aryan-coder/BLACKFLAG_HQ_BACKEND))

### 2. Clone the Repository
```bash
git clone https://github.com/Dev-Aryan-coder/BLACKFLAG_HQ_FRONTEND.git
cd BLACKFLAG_HQ_FRONTEND
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:5173/`**.

### 5. Build for Production
```bash
npm run build
```

Preview the production bundle locally:
```bash
npm run preview
```

---

## 🎮 Game Controls ("Defend the Black Pearl")

| Action | Control |
| :--- | :--- |
| **Throttle Ahead / Astern** | `W` / `S` |
| **Steer Rudder Port / Starboard** | `A` / `D` |
| **Nudge Cannon Traverse** | `Q` / `E` |
| **Fire Active Broadside** | `SPACE` or Tap on screen |
| **Ammunition Selection** | `1` Round Shot · `2` Chain Shot · `3` Grapeshot |
| **Mystic Sea Shield** | `X` (Invulnerability bubble) |
| **Emergency Timber Repairs** | `R` (Restores ship hull) |

---

## 🔗 Related Repositories
- **Backend API**: [Dev-Aryan-coder/BLACKFLAG_HQ_BACKEND](https://github.com/Dev-Aryan-coder/BLACKFLAG_HQ_BACKEND)

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more details.
