# GBU Incubation 2.0 — Connected Digital Transformation Platform
**Atal Incubation Centre – Gautam Buddha University Research and Innovation Foundation (GBURIF)**

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Status: Production Ready](https://img.shields.io/badge/Status-V5%20Enterprise-success.svg)](#)
[![Built for: Gautam Buddha University](https://img.shields.io/badge/Institution-AIC--GBU-0F3D3E.svg)](https://www.gbu.ac.in)

> A unified digital startup ecosystem platform transforming Gautam Buddha University's incubation centre from a static informational website into an interconnected, self-service innovation operating system for students, founders, mentors, judges, and administrators.

---

## 🏛️ About the Platform

Gautam Buddha University’s AIC–GBU Incubation Centre hosts **30,000+ sq. ft.** of state-of-the-art incubation facilities, **54+ registered startups**, and **100+ ideation-stage ventures** across Uttar Pradesh and the NCR region.

**GBU Incubation 2.0** bridges all ecosystem stakeholders through one unified digital experience:
- **For Students:** Find multidisciplinary co-founders, book prototyping lab benches, track innovation attendance credits, and earn verifiable certificates.
- **For Startups & Founders:** Apply for incubation via a 3-step structured wizard, track government seed grant milestones, and book 1-on-1 sessions with industry mentors.
- **For Hackathons & Competitions:** End-to-end competition management, multi-track submissions, 4-dimension weighted rubric judging, live leaderboard recalculations, and instant digital certificates.
- **For Events & Masterclasses:** Discover conclaves, reserve seats with live capacity meters, generate high-density QR entrance tickets, and verify check-ins with door scanners.
- **For Administrators & University Leadership:** 8-tab operational cockpit featuring live telemetry, an application review Kanban board, equipment allotment approvals, seed grant tranche releases, and ISO/IEC 27001 tamper-evident audit logs.

---

## 🚀 Key Feature Pillars

### 1. 🎓 Dedicated Student Innovation Portal
- **Student Identity Profile:** Live badge with roll number, school (`USICT`), and B.Tech CSE details.
- **Innovation Credits Progress:** Visual progress bar tracking 48 / 60 credits towards the university's Innovation Excellence Certification.
- **4-Stat Activity Analytics:** Real-time counters for enrolled hackathons, registered events, verified certificates, and lab sessions.
- **Cross-School Teammate Matching Noticeboard:** Connects developers, biotech researchers, and business modelers.
- **Prototyping Bench Scheduling:** Direct reservation system for IoT, Biotech, and 3D Rapid Prototyping benches.
- **1-on-1 Mentorship Booking:** Direct scheduling with faculty deans, angel investors, and AI architects.

### 2. ⚡ Hackathon & Challenge Control Center
- **Multi-Track Catalog:** Clean competition cards with live status badges, prize pools (₹5,00,000), and deadline countdowns.
- **Online Team & Project Registration Modal:** 2-column wizard collecting team roster, track selection, GitHub repo link, and live demo URL.
- **Interactive 4-Dimension Rubric Modal:** Weighted scoring sliders (Problem Statement 20%, Technical Feasibility 30%, Prototype Quality 30%, Commercial Viability 20%).
- **Automated Score Calculations & Leaderboard:** Dynamic client-side score computation with instant leaderboard re-ranking.
- **Digital Certificates of Excellence:** Instant preview and verification with unique certificate hashes.

### 3. 🎫 Events, Programs & QR Ticketing
- **Live Seat Quota Bars:** Visual progress tracking remaining seats vs. total hall capacity.
- **Dynamic 2D QR Pass Generator:** Client-side high-density QR code creation using HTML5 Canvas.
- **Digital Delegate Passes:** Formatted passes displaying pass ID, venue timestamp, and delegate tier.
- **Simulated Door Scanner & Check-In Console:** Fast entrance check-in verification with instant state updates.

### 4. 🔬 Specialized Labs & Prototyping Facilities
- **6 Specialized R&D Centres:** IoT & Robotics, Biotech Analytical Testing, 3D Fabrication, AI GPU Compute Cluster, EV Mobility Lab, and AgriTech Testing Lab.
- **Equipment Inventory Directory:** Full lists of available machinery and instruments per lab.
- **Supervisor Approval Routing:** Integrated faculty in-charge badges and reservation validation.

### 5. 💰 Seed Grants & Funding Ledger
- **Public Audit Transparency:** Transparent deployment ledger for UP StartInUP, SISFS, and NIDHI-PRAYAS funds.
- **Sanctioned vs. Disbursed Meters:** Live tracking of milestone disbursements and remaining tranches.
- **Government Sanction References:** Verifiable sanction IDs and audit references.

### 6. 📊 Executive Admin Cockpit & Kanban Board
- **8-Tab Modular Navigation:** Zero-refresh sub-navigation across Overview, Hackathons, Events, Intake Applications, Labs, Grants, Audit Logs, and NIRF Compliance.
- **4-Column Application Pipeline Kanban:** Visual Kanban board (Inbox → Review → Shortlisted → Approved) for incubation review boards.
- **Live Administrative Actions:** Toggle hackathon states, add +50 seats to events, disburse grant tranches, and approve lab benches with one click.
- **ISO/IEC 27001 Security Audit Log:** Tamper-evident log tracking every admin decision with severity badges.
- **Accreditation Desk:** Formatted data returns for NIRF Innovation, NAAC Criterion 3.3.2, and ARIIA.

### 7. 🌐 Global UX Suite
- **Dynamic Scroll Progress Bar:** Gradient viewport indicator.
- **Global Search Overlay (`Ctrl+K`):** Keyboard-driven search across competitions, events, startups, and facilities.
- **Notification Center:** Header bell with unread badge and one-click clear.
- **Floating Action Button (FAB):** Bottom-right quick-action trigger with micro-interactions.
- **Interactive AI Assistant Bot:** Contextual chatbot answering queries on hackathons, seed grants, and incubation.
- **Local Persistence:** Powered by `localStorage` (`GBU_INCUBATION_APP_STATE_V4`) so all actions persist across reloads.

---

## 📂 Project Architecture

```
gbu-incubaton-/
│
├── index.html                   # Core single-page application (8 portals + 12 modals)
├── README.md                    # Platform documentation
├── .gitignore                   # Standard Git exclusions
│
└── assets/
    ├── css/
    │   └── style.css            # Enterprise CSS3 design system (GBU Teal & Terracotta)
    │
    ├── js/
    │   ├── app.js               # Central state store, persistence, search, chat & FAB
    │   └── controllers.js       # CRUD controllers, rubric math, QR passes, Kanban
    │
    ├── vendor/                  # Local offline vendor libraries (zero CDN dependencies)
    │   ├── lucide.js            # Feather/Lucide SVG icon engine
    │   ├── qrcode.min.js        # High-density canvas QR generator
    │   └── confetti.min.js      # Milestone celebration particle engine
    │
    ├── img/                     # Real GBU campus imagery, labs, events & VC photo
    └── logos/                   # Genuine GBU incubated startup logos
```

---

## 🛠️ Local Development & Quickstart

No heavy backend, Node.js, or external database required. The platform runs entirely client-side on modern standard web technologies.

### Option 1: Python HTTP Server (Recommended)
```bash
# Clone the repository
git clone git@github.com:YuganshGoyal2007/gbu-incubaton-.git
cd gbu-incubaton-

# Start local server on port 8080
python -m http.server 8080
```
Open **`http://localhost:8080/index.html`** in your browser.

### Option 2: Direct File Open
Simply double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 🎨 Design System

| Element | Specification |
| :--- | :--- |
| **Primary Color** | Deep GBU Forest Teal (`#0F3D3E`, `#1A5653`) |
| **Accent Color** | Terracotta Warm Orange (`#E2725B`, `#F88F79`) |
| **Neutral Slate** | Dark Charcoal Slate (`#1E293B`, `#334155`) |
| **Background** | Clean Crisp Airy Canvas (`#FAFCFC`, `#FFFFFF`) |
| **Typography** | Inter & Plus Jakarta Sans |
| **Icons** | 100% Crisp Lucide SVGs (Zero Emojis in UI) |

---

## 📜 Accreditation & Institutional Context

Prepared for Gautam Buddha University’s **Atal Incubation Centre (AIC-GBU / GBURIF)** in compliance with:
- **DPIIT & Startup India** incubation guidelines
- **StartInUP** (Government of Uttar Pradesh Innovation Mission)
- **NIRF Innovation & ARIIA** data return parameters
- **NAAC Criterion 3.3.2** incubation ecosystem compliance

---

## 👥 Contributors

- **AIC–GBU Research & Innovation Foundation (GBURIF)**
- **Gautam Buddha University, Greater Noida, UP - 201312**
- Maintained by [Yugansh Goyal](https://github.com/YuganshGoyal2007)
