/* ==========================================================================
   GBU INCUBATION 2.0 - EXPANDED MODULE CONTROLLERS (V4 SUPERCHARGED)
   Full Admin Suite, Multi-Tab Cockpit, Hackathon & Event Management,
   Facility Approvals, Seed Grant Disbursements, Audit Logs & Reporting
   ========================================================================== */

// --- 1. MODAL CONTROLS ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// --- 2. ADMIN COCKPIT MULTI-TAB CONTROLLER (50+ NEW MANAGEMENT CAPABILITIES) ---
function switchAdminTab(tabId) {
  APP_STATE.currentAdminTab = tabId;
  
  // Highlight sidebar item
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-admin-tab') === tabId) {
      item.classList.add('active');
    }
  });

  // Show target tab pane
  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  // Update Topbar Title
  const titleMap = {
    'admin-overview': { title: 'Executive Overview & Live Telemetry', subtitle: 'Cross-functional incubation metrics and system health' },
    'admin-hackathons': { title: 'Hackathon & Challenge Control Center', subtitle: 'Full competition lifecycle, track management, quotas & rubric configurations' },
    'admin-events': { title: 'Event Roster, Seating Quotas & Attendance', subtitle: 'Registration capacity, waitlists, attendee exports & entrance verification' },
    'admin-applications': { title: 'Incubation Applications & Review Board', subtitle: 'Applicant pipelines, review assignments, and formal board approvals' },
    'admin-facilities': { title: 'Lab Benches & Equipment Scheduling Desk', subtitle: 'Review and approve student prototype laboratory reservations' },
    'admin-grants': { title: 'Seed Grants & Tranche Disbursement Management', subtitle: 'Milestone tracking, financial vouchers, and utilization certificates' },
    'admin-audit': { title: 'System Security & Activity Audit Trail', subtitle: 'Immutable ledger of administrative decisions, score locks, and check-ins' },
    'admin-nirf': { title: 'Institutional NIRF / NAAC / ARIIA Compliance Desk', subtitle: 'Generate verifiable innovation ledgers for accreditation agencies' }
  };

  const meta = titleMap[tabId] || titleMap['admin-overview'];
  const titleEl = document.getElementById('admin-topbar-title');
  const subEl = document.getElementById('admin-topbar-subtitle');
  if (titleEl) titleEl.innerText = meta.title;
  if (subEl) subEl.innerText = meta.subtitle;

  // Render specific tab content
  if (tabId === 'admin-hackathons') renderAdminHackathonsTab();
  if (tabId === 'admin-events') renderAdminEventsTab();
  if (tabId === 'admin-facilities') renderAdminFacilitiesTab();
  if (tabId === 'admin-grants') renderAdminGrantsTab();
  if (tabId === 'admin-audit') renderAdminAuditTab();

  if (window.lucide) window.lucide.createIcons();
}

function renderAdminView() {
  // Update KPI indicators
  const kpiStartups = document.getElementById('kpi-startups-count');
  if (kpiStartups) kpiStartups.innerText = APP_STATE.stats.startupsIncubated;

  const kpiApps = document.getElementById('kpi-apps-count');
  if (kpiApps) kpiApps.innerText = APP_STATE.applications.length;

  const kpiHackTeams = document.getElementById('kpi-hack-teams-count');
  if (kpiHackTeams) kpiHackTeams.innerText = APP_STATE.hackathonSubmissions.length;

  const kpiFunds = document.getElementById('kpi-funds-count');
  if (kpiFunds) kpiFunds.innerText = `₹${APP_STATE.stats.fundsRaisedCr} Cr`;

  // Render Applications Review Queue
  const appRowsHtml = APP_STATE.applications.map(app => `
    <tr>
      <td>
        <strong style="color: var(--navy); font-size: 0.95rem;">${app.ventureName}</strong><br>
        <span style="font-size: 0.78rem; color: var(--muted);">${app.id} • ${app.sector}</span>
      </td>
      <td>${app.founder}<br><small style="color: var(--muted);">${app.email}</small></td>
      <td><span class="badge badge-neutral">${app.stage}</span></td>
      <td>
        <span class="badge ${app.status.includes('Approved') ? 'badge-success' : (app.status.includes('Shortlist') ? 'badge-primary' : 'badge-warning')}">
          ${app.status}
        </span>
      </td>
      <td><strong>${app.score}/100</strong></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn btn-outline-primary btn-sm" onclick="reviewApplication('${app.id}')">
            Review
          </button>
          <button class="btn btn-primary btn-sm" onclick="approveApplication('${app.id}')">
            Approve
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  const appTable = document.getElementById('admin-applications-table-body');
  if (appTable) appTable.innerHTML = appRowsHtml;
  const appTableFull = document.getElementById('admin-applications-table-body-full');
  if (appTableFull) appTableFull.innerHTML = appRowsHtml;

  // Render Admin Hackathons, Events, Facilities, Grants, Audit
  renderAdminHackathonsTab();
  renderAdminEventsTab();
  renderAdminFacilitiesTab();
  renderAdminGrantsTab();
  renderAdminAuditTab();

  if (window.lucide) window.lucide.createIcons();
}

// Admin Hackathon Management CRUD
function renderAdminHackathonsTab() {
  const container = document.getElementById('admin-hackathons-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.hackathons.map(h => `
    <tr>
      <td>
        <strong style="color: var(--navy); font-size: 0.95rem;">${h.title}</strong>
        <span style="font-size: 0.78rem; color: var(--muted); display: block;">${h.id} • ${h.venue}</span>
      </td>
      <td>
        <span class="badge ${h.status.includes('Open') ? 'badge-success' : 'badge-warning'}">${h.status}</span>
      </td>
      <td><strong>${h.teamsRegistered}</strong> Teams</td>
      <td><strong style="color: var(--primary);">${h.prizePool}</strong></td>
      <td><span style="font-size: 0.85rem;">${h.registrationDeadline}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn btn-outline-primary btn-sm" onclick="toggleHackathonStatus('${h.id}')">
            Toggle Status
          </button>
          <button class="btn btn-subtle btn-sm" onclick="alert('Exporting verified team rosters for ${h.title} in CSV...')">
            Export Rosters
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleHackathonStatus(hackId) {
  const h = APP_STATE.hackathons.find(x => x.id === hackId);
  if (!h) return;
  h.status = h.status === 'Open for Registration' ? 'Judging In Progress' : 'Open for Registration';
  persistState();
  renderAdminHackathonsTab();
  renderHackathonPortal();
  logAdminAction('HACKATHON_STATUS_MODIFIED', `Changed status of ${h.title} to: ${h.status}`, 'Medium');
  showToast(`Updated ${h.title} status to: ${h.status}`, 'info');
}

function handleCreateHackathon(e) {
  e.preventDefault();
  const title = document.getElementById('admin-new-hack-title').value;
  const theme = document.getElementById('admin-new-hack-theme').value;
  const deadline = document.getElementById('admin-new-hack-deadline').value;
  const dates = document.getElementById('admin-new-hack-dates').value;
  const prize = document.getElementById('admin-new-hack-prize').value;
  const venue = document.getElementById('admin-new-hack-venue').value;

  const newHack = {
    id: 'hack-2027-' + (APP_STATE.hackathons.length + 1),
    title,
    theme,
    status: 'Open for Registration',
    registrationDeadline: deadline,
    eventDates: dates,
    prizePool: prize,
    venue,
    tracks: ['DeepTech & Robotics', 'Clean Energy', 'Smart Agriculture'],
    teamsRegistered: 0,
    maxTeamSize: 4,
    bannerImg: 'assets/img/gallery_session.jpg',
    rules: 'Published by Incubation Directorate. Standard national eligibility applies.',
    rubric: [
      { id: 'crit-1', name: 'Problem Statement & Impact', weight: 20, max: 20 },
      { id: 'crit-2', name: 'Innovation & Technical Feasibility', weight: 30, max: 30 },
      { id: 'crit-3', name: 'Working Prototype / Code Quality', weight: 30, max: 30 },
      { id: 'crit-4', name: 'Commercial Viability & Presentation', weight: 20, max: 20 }
    ]
  };

  APP_STATE.hackathons.unshift(newHack);
  persistState();
  closeModal('modal-create-hackathon');
  logAdminAction('HACKATHON_PUBLISHED', `Created new competition: ${title} (${newHack.id})`, 'High');
  showToast(`Hackathon "${title}" published successfully!`, 'success');
  triggerCelebration();

  renderAdminHackathonsTab();
  renderHackathonPortal();
  e.target.reset();
}

// Admin Events Management CRUD
function renderAdminEventsTab() {
  const container = document.getElementById('admin-events-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.events.map(evt => `
    <tr>
      <td>
        <strong style="color: var(--navy); font-size: 0.95rem;">${evt.title}</strong>
        <span style="font-size: 0.78rem; color: var(--muted); display: block;">${evt.id} • ${evt.category}</span>
      </td>
      <td>
        <span class="badge badge-primary">${evt.date}</span>
      </td>
      <td>
        <strong>${evt.registeredCount} / ${evt.capacity}</strong>
        <div style="width: 100px; height: 4px; background: var(--border); border-radius: 2px; margin-top: 4px; overflow: hidden;">
          <div style="width: ${(evt.registeredCount / evt.capacity) * 100}%; height: 100%; background: var(--primary);"></div>
        </div>
      </td>
      <td><span class="badge ${evt.badge.includes('Open') ? 'badge-success' : 'badge-warning'}">${evt.badge}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn btn-outline-primary btn-sm" onclick="increaseEventCapacity('${evt.id}')">
            +50 Seats
          </button>
          <button class="btn btn-subtle btn-sm" onclick="alert('Exporting delegate pass list for ${evt.title} in CSV...')">
            Export Passes
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function increaseEventCapacity(evtId) {
  const evt = APP_STATE.events.find(e => e.id === evtId);
  if (!evt) return;
  evt.capacity += 50;
  persistState();
  renderAdminEventsTab();
  renderEventsPortal();
  logAdminAction('EVENT_CAPACITY_EXPANDED', `Expanded quota for ${evt.title} to ${evt.capacity} seats.`, 'Low');
  showToast(`Added 50 seats to ${evt.title}. Total capacity: ${evt.capacity}`, 'success');
}

function handleCreateEvent(e) {
  e.preventDefault();
  const title = document.getElementById('admin-new-evt-title').value;
  const category = document.getElementById('admin-new-evt-cat').value;
  const date = document.getElementById('admin-new-evt-date').value;
  const time = document.getElementById('admin-new-evt-time').value;
  const venue = document.getElementById('admin-new-evt-venue').value;
  const capacity = parseInt(document.getElementById('admin-new-evt-capacity').value);
  const desc = document.getElementById('admin-new-evt-desc').value;

  const newEvt = {
    id: 'evt-' + (APP_STATE.events.length + 301),
    title,
    category,
    date,
    time,
    venue,
    mode: venue.includes('Zoom') || venue.includes('Virtual') ? 'Virtual (Zoom)' : 'In-Person (Campus)',
    capacity,
    registeredCount: 0,
    image: 'assets/img/gallery_event_1.jpg',
    badge: 'Registrations Open',
    speakers: ['GBU Incubation Panel'],
    description: desc
  };

  APP_STATE.events.unshift(newEvt);
  persistState();
  closeModal('modal-create-event');
  logAdminAction('EVENT_PUBLISHED', `Created and scheduled event: ${title} (${newEvt.id})`, 'High');
  showToast(`Event "${title}" scheduled and published!`, 'success');
  triggerCelebration();

  renderAdminEventsTab();
  renderEventsPortal();
  e.target.reset();
}

// Admin Facilities & Lab Approvals Tab
function renderAdminFacilitiesTab() {
  const container = document.getElementById('admin-facilities-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.studentProfile.labBookings.map((b, idx) => `
    <tr>
      <td><strong>${b.lab}</strong></td>
      <td>${b.bench || 'Bench Assigned on Arrival'}</td>
      <td><span class="badge badge-neutral">${b.slot}</span></td>
      <td>Aryan Sharma (23/ICS/042)</td>
      <td><span class="badge ${b.status === 'Approved' || b.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}">${b.status}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn btn-outline-primary btn-sm" onclick="approveLabBooking(${idx})">
            Approve Bench
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="revokeLabBooking(${idx})">
            Release
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function approveLabBooking(idx) {
  const booking = APP_STATE.studentProfile.labBookings[idx];
  if (!booking) return;
  booking.status = 'Approved';
  persistState();
  renderAdminFacilitiesTab();
  renderStudentPortal();
  logAdminAction('LAB_BENCH_APPROVED', `Approved reservation for ${booking.lab} (${booking.bench})`, 'Low');
  showToast(`Approved lab bench reservation!`, 'success');
}

function revokeLabBooking(idx) {
  const booking = APP_STATE.studentProfile.labBookings[idx];
  if (!booking) return;
  APP_STATE.studentProfile.labBookings.splice(idx, 1);
  persistState();
  renderAdminFacilitiesTab();
  renderStudentPortal();
  logAdminAction('LAB_BENCH_RELEASED', `Released slot for ${booking.lab}`, 'Low');
  showToast(`Released lab slot!`, 'info');
}

// Admin Grants & Seed Funding Management Tab
function renderAdminGrantsTab() {
  const container = document.getElementById('admin-grants-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.fundingLedger.map((g, idx) => `
    <tr>
      <td>
        <strong style="color: var(--navy); font-size: 0.95rem;">${g.venture}</strong>
        <span style="font-size: 0.78rem; color: var(--muted); display: block;">${g.id} • ${g.auditRef}</span>
      </td>
      <td><span class="badge badge-neutral">${g.grantScheme}</span></td>
      <td><strong style="color: var(--primary);">${g.sanctionedAmount}</strong></td>
      <td><strong style="color: var(--success);">${g.disbursedAmount}</strong></td>
      <td><span class="badge ${g.status.includes('Completed') ? 'badge-success' : 'badge-warning'}">${g.status}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button class="btn btn-outline-primary btn-sm" onclick="disburseNextTranche(${idx})">
            Release Next Tranche
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function disburseNextTranche(idx) {
  const grant = APP_STATE.fundingLedger[idx];
  if (!grant) return;
  grant.status = 'Fully Disbursed';
  grant.disbursedAmount = grant.sanctionedAmount;
  grant.stage = 'Completed Milestone';
  persistState();
  renderAdminGrantsTab();
  renderFundingPortal();
  logAdminAction('GRANT_TRANCHE_DISBURSED', `Authorized full tranche disbursement of ${grant.sanctionedAmount} for ${grant.venture}`, 'High');
  showToast(`Disbursed full grant tranche to ${grant.venture}!`, 'success');
  triggerCelebration();
}

// Admin Audit Log Viewer
function renderAdminAuditTab() {
  const container = document.getElementById('admin-audit-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.auditLogs.map(log => `
    <tr>
      <td><span style="font-family: monospace; font-size: 0.8rem; color: var(--muted);">${log.timestamp}</span></td>
      <td><strong>${log.actor}</strong></td>
      <td><span class="badge ${log.severity === 'High' ? 'badge-danger' : (log.severity === 'Medium' ? 'badge-warning' : 'badge-info')}">${log.action}</span></td>
      <td><span style="font-size: 0.85rem; color: var(--navy-light);">${log.details}</span></td>
    </tr>
  `).join('');
}

function logAdminAction(action, details, severity = 'Low') {
  const newLog = {
    id: 'LOG-' + Math.floor(9000 + Math.random() * 1000),
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    actor: APP_STATE.currentRole.toUpperCase() + ' (Console)',
    action,
    details,
    severity
  };
  APP_STATE.auditLogs.unshift(newLog);
  persistState();
  renderAdminAuditTab();
}

// --- 3. STUDENT INNOVATION PORTAL CONTROLLER ---
function renderStudentPortal() {
  const student = APP_STATE.studentProfile;
  
  const nameEl = document.getElementById('student-profile-name');
  if (nameEl) nameEl.innerText = student.name;

  const rollEl = document.getElementById('student-profile-roll');
  if (rollEl) rollEl.innerText = `Roll No: ${student.rollNo} • ${student.program}`;

  const schoolEl = document.getElementById('student-profile-school');
  if (schoolEl) schoolEl.innerText = student.school;

  const creditsEl = document.getElementById('student-credits-display');
  if (creditsEl) creditsEl.innerText = student.attendanceCredit;

  // Active Team Details
  const teamWrap = document.getElementById('student-team-details');
  if (teamWrap) {
    teamWrap.innerHTML = `
      <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <div>
            <h4 style="font-size: 1.15rem; color: var(--navy); margin-bottom: 2px;">${student.activeTeam}</h4>
            <span class="badge badge-primary">Track: CleanTech & Drone Mobility</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="switchView('hackathons')">
            <i data-lucide="external-link"></i> Project Workspace
          </button>
        </div>
        <p style="font-size: 0.88rem; color: var(--navy-light); margin-bottom: 0.75rem;">
          Autonomous Drone Pollination & Crop Health Telemetry using custom edge computer vision payloads.
        </p>
        <div style="font-size: 0.82rem; color: var(--muted); display: flex; gap: 1rem; flex-wrap: wrap;">
          <span><strong>Role:</strong> Team Leader</span>
          <span><strong>Mentor:</strong> ${student.mentorAssigned}</span>
          <span><strong>Repo:</strong> github.com/aeroveda-gbu</span>
        </div>
      </div>
    `;
  }

  // Earned Certificates
  const certList = document.getElementById('student-cert-list');
  if (certList) {
    certList.innerHTML = student.certificatesEarned.map(c => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 0.65rem;">
        <div>
          <strong style="color: var(--navy); font-size: 0.92rem; display: block;">${c.title}</strong>
          <span style="font-size: 0.75rem; color: var(--muted);">${c.id} • Conferred ${c.date}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm" onclick="generateCertificate('${c.id}', '${student.activeTeam}', '${student.name}', '${c.title}')">
          <i data-lucide="award"></i> View Verifiable Pass
        </button>
      </div>
    `).join('');
  }

  // Lab Bookings
  const labList = document.getElementById('student-lab-bookings');
  if (labList) {
    labList.innerHTML = student.labBookings.map(b => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 0.65rem;">
        <div>
          <strong style="color: var(--navy); font-size: 0.92rem; display: block;">${b.lab}</strong>
          <span style="font-size: 0.75rem; color: var(--muted);">${b.bench ? b.bench + ' • ' : ''}${b.slot}</span>
        </div>
        <span class="badge badge-success">${b.status}</span>
      </div>
    `).join('');
  }

  // Team Matching Board
  renderTeamMatchingBoard();

  if (window.lucide) window.lucide.createIcons();
}

// Render Teammate Matching Posts
function renderTeamMatchingBoard() {
  const container = document.getElementById('team-matching-posts-wrap');
  if (!container) return;

  container.innerHTML = APP_STATE.teamMatchPosts.map(post => `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1rem; box-shadow: var(--shadow-xs);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
        <div>
          <strong style="font-size: 1rem; color: var(--navy); display: block;">${post.author}</strong>
          <span style="font-size: 0.78rem; color: var(--muted);">${post.course} • ${post.hackathon}</span>
        </div>
        <span class="badge badge-accent">${post.status}</span>
      </div>
      <p style="font-size: 0.88rem; color: var(--navy-light); margin-bottom: 0.6rem;"><strong>Concept:</strong> ${post.projectConcept}</p>
      <div style="background: var(--primary-surface); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem;">
        <strong>Looking for:</strong> ${post.lookingFor}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          ${post.skillsPresent.map(s => `<span class="badge badge-neutral" style="font-size: 0.7rem;">${s}</span>`).join('')}
        </div>
        <button class="btn btn-outline-primary btn-sm" onclick="alert('Connection request sent to ${post.author} (${post.contact})')">
          <i data-lucide="message-square"></i> Request to Join Team
        </button>
      </div>
    </div>
  `).join('');
}

function handlePostTeamMatch(e) {
  e.preventDefault();
  const author = APP_STATE.studentProfile.name;
  const course = APP_STATE.studentProfile.program;
  const hackathon = document.getElementById('post-match-hackathon').value;
  const concept = document.getElementById('post-match-concept').value;
  const looking = document.getElementById('post-match-looking').value;
  const skills = document.getElementById('post-match-skills').value.split(',').map(s => s.trim());

  const newPost = {
    id: 'tm-' + (APP_STATE.teamMatchPosts.length + 1),
    author,
    course,
    hackathon,
    projectConcept: concept,
    lookingFor: looking,
    skillsPresent: skills,
    status: 'Open (2 spots left)',
    contact: APP_STATE.studentProfile.email
  };

  APP_STATE.teamMatchPosts.unshift(newPost);
  persistState();
  closeModal('modal-post-team-match');
  showToast('Teammate requirement published on student match board!', 'success');
  renderTeamMatchingBoard();
  e.target.reset();
}

function handleBookLabSlot(e) {
  e.preventDefault();
  const labName = document.getElementById('book-lab-name').value;
  const slot = document.getElementById('book-lab-slot').value;
  const reason = document.getElementById('book-lab-reason').value;

  const newBooking = {
    id: 'LB-' + Math.floor(100 + Math.random() * 900),
    lab: labName,
    bench: 'Bench #' + Math.floor(1 + Math.random() * 12),
    slot: slot,
    status: 'Confirmed'
  };

  APP_STATE.studentProfile.labBookings.unshift(newBooking);
  persistState();
  closeModal('modal-book-lab');
  showToast(`Lab bench confirmed at ${labName}!`, 'success');
  renderStudentPortal();
  e.target.reset();
}

function handleMentorRequest(e) {
  e.preventDefault();
  const mentorName = document.getElementById('req-mentor-name').value;
  const topic = document.getElementById('req-mentor-topic').value;

  closeModal('modal-request-mentor');
  showToast(`Mentorship session requested with ${mentorName}. Notification sent to mentor desk.`, 'info');
  e.target.reset();
}

// --- 4. LABS & FACILITIES DIRECTORY CONTROLLER ---
function renderFacilitiesPortal() {
  const container = document.getElementById('facilities-card-grid');
  if (!container) return;

  container.innerHTML = APP_STATE.facilities.map(f => `
    <div class="content-card">
      <div class="card-image-wrap" style="height: 200px;">
        <img src="${f.image}" alt="${f.name}">
        <span class="badge badge-success card-badge-floating">${f.status}</span>
      </div>
      <div class="card-body">
        <h4 class="card-title">${f.name}</h4>
        <div style="font-size: 0.82rem; color: var(--muted); margin-bottom: 0.75rem;">
          <i data-lucide="map-pin" style="width: 14px; height: 14px; vertical-align: middle;"></i> ${f.location} • <strong>${f.capacity}</strong>
        </div>
        <div style="background: var(--bg-subtle); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.8rem; margin-bottom: 1.25rem; border: 1px solid var(--border-light);">
          <strong style="color: var(--navy); display: block; margin-bottom: 4px;">Available Instrumentation:</strong>
          <ul style="margin-left: 1.25rem; color: var(--navy-light);">
            ${f.equipment.map(eq => `<li>${eq}</li>`).join('')}
          </ul>
        </div>
        <div class="card-footer">
          <span style="font-size: 0.78rem; color: var(--muted);"><i data-lucide="user"></i> ${f.incharge}</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('modal-book-lab')">
            <i data-lucide="calendar-plus"></i> Reserve Bench
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// --- 5. SEED GRANTS & FUNDING LEDGER CONTROLLER ---
function renderFundingPortal() {
  const container = document.getElementById('funding-ledger-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.fundingLedger.map(f => `
    <tr>
      <td>
        <strong style="color: var(--navy); display: block;">${f.venture}</strong>
        <span style="font-size: 0.75rem; color: var(--muted);">${f.id} • Ref: ${f.auditRef}</span>
      </td>
      <td>
        <span class="badge badge-neutral">${f.grantScheme}</span>
      </td>
      <td>
        <strong style="color: var(--primary); font-size: 0.95rem;">${f.sanctionedAmount}</strong>
      </td>
      <td>
        <strong style="color: var(--success); font-size: 0.95rem;">${f.disbursedAmount}</strong>
      </td>
      <td>
        <span class="badge ${f.status.includes('Completed') ? 'badge-success' : 'badge-warning'}">${f.status}</span>
        <div style="font-size: 0.75rem; color: var(--muted); margin-top: 2px;">${f.stage}</div>
      </td>
      <td>
        <button class="btn btn-subtle btn-sm" onclick="alert('Viewing utilization certificate and grant release milestone ledger for ${f.id}...')">
          <i data-lucide="file-text"></i> Audit Ledger
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// --- 6. HACKATHON WORKSPACE CONTROLLER ---
let activeEvaluationProject = null;

function renderHackathonPortal() {
  const listContainer = document.getElementById('hackathons-list-wrap');
  if (!listContainer) return;

  listContainer.innerHTML = APP_STATE.hackathons.map(h => `
    <div class="content-card" style="margin-bottom: 2rem;">
      <div style="display: grid; grid-template-columns: 360px 1fr; border-bottom: 1px solid var(--border);">
        <div style="height: 100%; position: relative;">
          <img src="${h.bannerImg}" alt="${h.title}" style="width: 100%; height: 100%; object-fit: cover;">
          <span class="badge ${h.status.includes('Open') ? 'badge-success' : 'badge-warning'} card-badge-floating">
            ${h.status}
          </span>
        </div>
        <div style="padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
              ${h.tracks.map(t => `<span class="badge badge-neutral">${t}</span>`).join('')}
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--navy);">${h.title}</h3>
            <p style="color: var(--navy-light); font-size: 0.95rem; margin-bottom: 1.25rem;">${h.theme}</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem; background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
              <div>
                <span style="font-size: 0.75rem; color: var(--muted); text-transform: uppercase; font-weight: 600; display: block;">Prize & Grant</span>
                <strong style="color: var(--primary); font-size: 1.05rem;">${h.prizePool}</strong>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--muted); text-transform: uppercase; font-weight: 600; display: block;">Registration Closes</span>
                <strong style="color: var(--navy); font-size: 0.95rem;">${h.registrationDeadline}</strong>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--muted); text-transform: uppercase; font-weight: 600; display: block;">Live Event Dates</span>
                <strong style="color: var(--navy); font-size: 0.95rem;">${h.eventDates}</strong>
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border-light); padding-top: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--muted);">
              <span><i data-lucide="users" style="width: 16px; height: 16px; vertical-align: middle;"></i> ${h.teamsRegistered} Teams Enrolled</span>
              <span>•</span>
              <span><i data-lucide="map-pin" style="width: 16px; height: 16px; vertical-align: middle;"></i> ${h.venue}</span>
            </div>
            <div style="display: flex; gap: 0.75rem;">
              <button class="btn btn-outline" onclick="openHackathonDetail('${h.id}')">
                <i data-lucide="info"></i> Competition Brief
              </button>
              <button class="btn btn-primary" onclick="startHackathonRegistration('${h.id}')">
                <i data-lucide="plus-circle"></i> Register Team & Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  renderSubmissionsWorkspace();
  if (window.lucide) window.lucide.createIcons();
}

function openHackathonDetail(hackId) {
  const h = APP_STATE.hackathons.find(x => x.id === hackId);
  if (!h) return;
  alert(`Competition Overview: ${h.title}\n\nTracks: ${h.tracks.join(', ')}\nRules: ${h.rules}\nVenue: ${h.venue}`);
}

function startHackathonRegistration(hackId) {
  const h = APP_STATE.hackathons.find(x => x.id === hackId);
  document.getElementById('modal-hackathon-name').innerText = h.title;
  document.getElementById('hackathon-id-input').value = hackId;
  openModal('modal-hackathon-register');
}

function handleHackathonRegistration(e) {
  e.preventDefault();
  const hackId = document.getElementById('hackathon-id-input').value;
  const teamName = document.getElementById('hack-team-name').value;
  const leadName = document.getElementById('hack-lead-name').value;
  const leadEmail = document.getElementById('hack-lead-email').value;
  const track = document.getElementById('hack-track').value;
  const projectTitle = document.getElementById('hack-project-title').value;
  const repoUrl = document.getElementById('hack-repo-url').value;
  const demoUrl = document.getElementById('hack-demo-url').value;

  const newSub = {
    id: 'sub-' + (APP_STATE.hackathonSubmissions.length + 101),
    hackathonId: hackId,
    teamName,
    leadName,
    leadEmail,
    projectTitle,
    track,
    repoUrl: repoUrl || 'https://github.com/gbu-innovation/' + teamName.toLowerCase().replace(/\s+/g, '-'),
    demoUrl: demoUrl || 'https://prototype.gburif.org',
    submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'Submitted',
    scores: { 'crit-1': 15, 'crit-2': 22, 'crit-3': 20, 'crit-4': 15 },
    totalScore: 72,
    feedback: 'Pending formal judge review.'
  };

  APP_STATE.hackathonSubmissions.unshift(newSub);
  
  const h = APP_STATE.hackathons.find(x => x.id === hackId);
  if (h) h.teamsRegistered++;

  persistState();
  closeModal('modal-hackathon-register');
  showToast(`Team "${teamName}" registered successfully! Confirmation ID: ${newSub.id}`, 'success');
  triggerCelebration();

  e.target.reset();
  renderHackathonPortal();
}

function renderSubmissionsWorkspace() {
  const container = document.getElementById('hackathon-submissions-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.hackathonSubmissions.map(sub => `
    <tr>
      <td>
        <strong style="color: var(--navy); display: block;">${sub.teamName}</strong>
        <span style="font-size: 0.78rem; color: var(--muted);">${sub.leadName} (${sub.leadEmail})</span>
      </td>
      <td>
        <strong>${sub.projectTitle}</strong>
        <div style="font-size: 0.78rem; color: var(--primary); margin-top: 2px;">Track: ${sub.track}</div>
      </td>
      <td>
        <span class="badge ${sub.totalScore >= 90 ? 'badge-success' : 'badge-info'}">
          Score: ${sub.totalScore}/100
        </span>
      </td>
      <td>
        <span class="badge badge-neutral">${sub.submittedAt}</span>
      </td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <a href="${sub.repoUrl}" target="_blank" class="btn btn-subtle btn-sm" title="View Source Code">
            <i data-lucide="code-2" style="width: 14px; height: 14px;"></i> Code
          </a>
          <button class="btn btn-outline-primary btn-sm" onclick="openJudgeRubricModal('${sub.id}')">
            <i data-lucide="clipboard-check" style="width: 14px; height: 14px;"></i> Evaluate
          </button>
          <button class="btn btn-accent btn-sm" onclick="generateCertificate('${sub.id}', '${sub.teamName}', '${sub.leadName}', '${sub.projectTitle}')">
            <i data-lucide="award" style="width: 14px; height: 14px;"></i> Certificate
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openJudgeRubricModal(subId) {
  const sub = APP_STATE.hackathonSubmissions.find(s => s.id === subId);
  if (!sub) return;
  activeEvaluationProject = sub;

  document.getElementById('rubric-team-title').innerText = `${sub.teamName} — ${sub.projectTitle}`;
  document.getElementById('rubric-sub-id').value = sub.id;

  const s1 = sub.scores['crit-1'] || 15;
  const s2 = sub.scores['crit-2'] || 20;
  const s3 = sub.scores['crit-3'] || 20;
  const s4 = sub.scores['crit-4'] || 15;

  document.getElementById('rubric-crit-1').value = s1;
  document.getElementById('score-crit-1').innerText = s1 + '/20';
  document.getElementById('rubric-crit-2').value = s2;
  document.getElementById('score-crit-2').innerText = s2 + '/30';
  document.getElementById('rubric-crit-3').value = s3;
  document.getElementById('score-crit-3').innerText = s3 + '/30';
  document.getElementById('rubric-crit-4').value = s4;
  document.getElementById('score-crit-4').innerText = s4 + '/20';

  document.getElementById('rubric-comments').value = sub.feedback || '';
  calculateLiveScore();
  openModal('modal-judge-rubric');
}

function updateRubricValue(critId, maxVal) {
  const slider = document.getElementById(`rubric-${critId}`);
  const display = document.getElementById(`score-${critId}`);
  if (slider && display) {
    display.innerText = slider.value + '/' + maxVal;
  }
  calculateLiveScore();
}

function calculateLiveScore() {
  const s1 = parseInt(document.getElementById('rubric-crit-1').value || 0);
  const s2 = parseInt(document.getElementById('rubric-crit-2').value || 0);
  const s3 = parseInt(document.getElementById('rubric-crit-3').value || 0);
  const s4 = parseInt(document.getElementById('rubric-crit-4').value || 0);
  const total = s1 + s2 + s3 + s4;
  const totalDisplay = document.getElementById('rubric-total-score-badge');
  if (totalDisplay) {
    totalDisplay.innerText = `${total}/100`;
  }
  return total;
}

function saveJudgeEvaluation() {
  if (!activeEvaluationProject) return;
  const s1 = parseInt(document.getElementById('rubric-crit-1').value);
  const s2 = parseInt(document.getElementById('rubric-crit-2').value);
  const s3 = parseInt(document.getElementById('rubric-crit-3').value);
  const s4 = parseInt(document.getElementById('rubric-crit-4').value);
  const comments = document.getElementById('rubric-comments').value;

  activeEvaluationProject.scores = {
    'crit-1': s1,
    'crit-2': s2,
    'crit-3': s3,
    'crit-4': s4
  };
  activeEvaluationProject.totalScore = s1 + s2 + s3 + s4;
  activeEvaluationProject.feedback = comments;

  persistState();
  closeModal('modal-judge-rubric');
  renderSubmissionsWorkspace();
  logAdminAction('RUBRIC_SCORE_LOCKED', `Judge locked evaluation for ${activeEvaluationProject.teamName} (${activeEvaluationProject.totalScore}/100)`, 'Medium');
  showToast(`Evaluation saved for ${activeEvaluationProject.teamName}. Total Score: ${activeEvaluationProject.totalScore}/100`, 'success');
}

// --- 7. DIGITAL CERTIFICATES ---
function generateCertificate(subId, team, lead, project) {
  const certId = 'GBU-CERT-2027-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('cert-id-badge').innerText = certId;
  document.getElementById('cert-recipient').innerText = lead;
  document.getElementById('cert-team').innerText = team;
  document.getElementById('cert-project').innerText = project;
  document.getElementById('cert-date').innerText = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const qrWrap = document.getElementById('cert-qr-container');
  if (qrWrap) {
    qrWrap.innerHTML = '';
    new QRCode(qrWrap, {
      text: `https://gburif.org/verify?certId=${certId}&team=${encodeURIComponent(team)}`,
      width: 76,
      height: 76,
      colorDark: "#0F3D3E",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  openModal('modal-certificate-preview');
}

function printCertificate() {
  window.print();
}

// --- 8. EVENTS & QR-BASED REGISTRATION / CHECK-IN ---
function renderEventsPortal() {
  const container = document.getElementById('events-card-grid');
  if (!container) return;

  container.innerHTML = APP_STATE.events.map(evt => `
    <div class="content-card">
      <div class="card-image-wrap">
        <img src="${evt.image}" alt="${evt.title}">
        <span class="badge badge-accent card-badge-floating">${evt.badge}</span>
      </div>
      <div class="card-body">
        <div class="card-meta-row">
          <span class="card-meta-item"><i data-lucide="calendar"></i> ${evt.date}</span>
          <span class="card-meta-item"><i data-lucide="clock"></i> ${evt.time}</span>
        </div>
        <h4 class="card-title">${evt.title}</h4>
        <p class="card-text">${evt.description}</p>
        
        <div style="background: var(--bg-subtle); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-size: 0.82rem; border: 1px solid var(--border-light);">
          <div style="margin-bottom: 0.35rem; display: flex; justify-content: space-between;">
            <span style="color: var(--muted);"><i data-lucide="map-pin" style="width: 14px; height: 14px; vertical-align: middle;"></i> Venue:</span>
            <strong>${evt.mode}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--muted);"><i data-lucide="users" style="width: 14px; height: 14px; vertical-align: middle;"></i> Capacity:</span>
            <span><strong>${evt.registeredCount}</strong> / ${evt.capacity} seats filled</span>
          </div>
          <div style="width: 100%; height: 5px; background: var(--border); border-radius: 3px; margin-top: 6px; overflow: hidden;">
            <div style="width: ${(evt.registeredCount / evt.capacity) * 100}%; height: 100%; background: var(--primary);"></div>
          </div>
        </div>

        <div class="card-footer">
          <span style="font-size: 0.78rem; font-weight: 600; color: var(--muted);">${evt.category}</span>
          <button class="btn btn-primary btn-sm" onclick="startEventRegistration('${evt.id}')">
            <i data-lucide="ticket"></i> Reserve Spot & Get QR Pass
          </button>
        </div>
      </div>
    </div>
  `).join('');

  renderEventRegistrationsTable();
  if (window.lucide) window.lucide.createIcons();
}

function startEventRegistration(evtId) {
  const evt = APP_STATE.events.find(e => e.id === evtId);
  if (!evt) return;
  document.getElementById('modal-event-name').innerText = evt.title;
  document.getElementById('event-id-input').value = evt.id;
  openModal('modal-event-register');
}

function handleEventRegistration(e) {
  e.preventDefault();
  const evtId = document.getElementById('event-id-input').value;
  const evt = APP_STATE.events.find(x => x.id === evtId);
  const name = document.getElementById('evt-reg-name').value;
  const email = document.getElementById('evt-reg-email').value;
  const institution = document.getElementById('evt-reg-inst').value;
  const passType = document.getElementById('evt-reg-type').value;

  const regId = 'EVT-REG-' + Math.floor(1000 + Math.random() * 9000);
  const qrString = `GBU-ENTRY:${regId}:${email}:${evtId}`;

  const regObj = {
    regId,
    eventId: evtId,
    eventTitle: evt.title,
    userName: name,
    email,
    institution,
    passType,
    qrValue: qrString,
    checkInStatus: 'Pending',
    registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  APP_STATE.eventRegistrations.unshift(regObj);
  evt.registeredCount++;

  persistState();
  closeModal('modal-event-register');
  showToast(`Registration confirmed for ${name}!`, 'success');
  
  displayQRPass(regObj);
  renderEventsPortal();
  e.target.reset();
}

function displayQRPass(reg) {
  document.getElementById('qr-modal-user').innerText = reg.userName;
  document.getElementById('qr-modal-inst').innerText = reg.institution;
  document.getElementById('qr-modal-event').innerText = reg.eventTitle;
  document.getElementById('qr-modal-regid').innerText = reg.regId;
  document.getElementById('qr-modal-type').innerText = reg.passType;

  const qrContainer = document.getElementById('qr-canvas-box');
  qrContainer.innerHTML = '';
  new QRCode(qrContainer, {
    text: reg.qrValue,
    width: 140,
    height: 140,
    colorDark: "#0F3D3E",
    colorLight: "#FFFFFF",
    correctLevel: QRCode.CorrectLevel.H
  });

  openModal('modal-qr-pass');
}

function renderEventRegistrationsTable() {
  const container = document.getElementById('event-attendees-table-body');
  if (!container) return;

  container.innerHTML = APP_STATE.eventRegistrations.map(r => `
    <tr>
      <td><strong>${r.userName}</strong><br><small style="color: var(--muted);">${r.email}</small></td>
      <td>${r.institution}</td>
      <td><span class="badge badge-neutral">${r.regId}</span></td>
      <td><span class="badge ${r.checkInStatus === 'Checked In' ? 'badge-success' : 'badge-warning'}">${r.checkInStatus}</span></td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-subtle btn-sm" onclick="displayQRPass(${JSON.stringify(r).replace(/"/g, '&quot;')})">
            <i data-lucide="qr-code"></i> View Pass
          </button>
          <button class="btn btn-outline-primary btn-sm" onclick="toggleEventCheckIn('${r.regId}')">
            ${r.checkInStatus === 'Checked In' ? 'Undo Check-in' : 'Verify & Check In'}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleEventCheckIn(regId) {
  const reg = APP_STATE.eventRegistrations.find(r => r.regId === regId);
  if (!reg) return;
  reg.checkInStatus = reg.checkInStatus === 'Checked In' ? 'Pending' : 'Checked In';
  persistState();
  renderEventRegistrationsTable();
  logAdminAction('ATTENDEE_CHECKIN_STATUS', `Check-in updated for ${reg.userName} (${reg.regId}): ${reg.checkInStatus}`, 'Low');
  showToast(`Attendee ${reg.userName} check-in status: ${reg.checkInStatus}`, 'info');
}

function simulateQRScan() {
  const pendingAttendee = APP_STATE.eventRegistrations.find(r => r.checkInStatus === 'Pending');
  if (pendingAttendee) {
    pendingAttendee.checkInStatus = 'Checked In';
    persistState();
    renderEventRegistrationsTable();
    logAdminAction('QR_DOOR_SCAN_SUCCESS', `Door scanner scanned pass for ${pendingAttendee.userName} (${pendingAttendee.regId})`, 'Low');
    showToast(`Scanner verified pass: ${pendingAttendee.userName} (${pendingAttendee.regId})`, 'success');
    triggerCelebration();
  } else {
    showToast('All registered attendees currently marked as checked in.', 'info');
  }
}

// --- 9. STARTUP INCUBATION APPLICATION WIZARD ---
let currentWizardStep = 1;

function openApplicationWizard() {
  currentWizardStep = 1;
  updateWizardUI();
  openModal('modal-incubation-wizard');
}

function nextWizardStep() {
  if (currentWizardStep < 3) {
    currentWizardStep++;
    updateWizardUI();
  } else {
    submitIncubationApplication();
  }
}

function prevWizardStep() {
  if (currentWizardStep > 1) {
    currentWizardStep--;
    updateWizardUI();
  }
}

function updateWizardUI() {
  for (let i = 1; i <= 3; i++) {
    const node = document.getElementById(`wiz-step-node-${i}`);
    if (node) {
      if (i === currentWizardStep) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    }
    const pane = document.getElementById(`wiz-pane-${i}`);
    if (pane) {
      pane.style.display = i === currentWizardStep ? 'block' : 'none';
    }
  }

  const prevBtn = document.getElementById('wiz-prev-btn');
  const nextBtn = document.getElementById('wiz-next-btn');

  if (prevBtn) prevBtn.style.display = currentWizardStep === 1 ? 'none' : 'inline-flex';
  if (nextBtn) {
    nextBtn.innerHTML = currentWizardStep === 3 ? '<i data-lucide="send"></i> Submit Formal Application' : 'Proceed to Next Step <i data-lucide="arrow-right"></i>';
    if (window.lucide) window.lucide.createIcons();
  }
}

function submitIncubationApplication() {
  const venture = document.getElementById('app-venture-name').value || 'NovaPulse Energy';
  const founder = document.getElementById('app-founder-name').value || 'Aryan Sharma';
  const email = document.getElementById('app-email').value || 'aryan.sharma@gbu.ac.in';
  const phone = document.getElementById('app-phone').value || '+91 98765 43210';
  const sector = document.getElementById('app-sector').value || 'CleanTech & Energy';
  const stage = document.getElementById('app-stage').value || 'Early Prototype';
  const support = document.getElementById('app-support').value || 'Dedicated Lab Bench, Seed Prototype Grant';

  const newApp = {
    id: 'APP-2027-0' + (APP_STATE.applications.length + 51),
    ventureName: venture,
    founder,
    email,
    phone,
    sector,
    stage,
    supportNeeded: support,
    submittedDate: new Date().toISOString().substring(0, 10),
    status: 'Under Review',
    score: 82,
    notes: 'Submitted via Incubation 2.0 digital portal. Routing to sector reviewer.'
  };

  APP_STATE.applications.unshift(newApp);
  APP_STATE.stats.startupsIncubated++;
  persistState();

  closeModal('modal-incubation-wizard');
  logAdminAction('APPLICATION_SUBMITTED', `New startup application received: ${venture} by ${founder} (${newApp.id})`, 'Medium');
  showToast(`Application ${newApp.id} for "${venture}" received successfully!`, 'success');
  triggerCelebration();

  renderStartupsDirectory();
  if (APP_STATE.currentTab === 'admin') renderAdminView();
}

function renderStartupsDirectory() {
  const container = document.getElementById('startups-grid-wrap');
  if (!container) return;

  container.innerHTML = APP_STATE.startups.map(s => `
    <div class="content-card">
      <div style="padding: 1.5rem; border-bottom: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; background: var(--bg-subtle);">
        <div style="width: 60px; height: 60px; background: #FFFFFF; border-radius: var(--radius-md); padding: 6px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;">
          <img src="${s.logo}" alt="${s.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        <span class="badge badge-primary">${s.stage}</span>
      </div>
      <div class="card-body">
        <span style="font-size: 0.78rem; font-weight: 600; color: var(--accent); text-transform: uppercase;">${s.sector}</span>
        <h4 style="font-size: 1.25rem; margin: 0.25rem 0 0.5rem; color: var(--navy);">${s.name}</h4>
        <p style="font-size: 0.88rem; color: var(--navy-light); margin-bottom: 1rem; flex-grow: 1;">${s.summary}</p>
        
        <div style="padding: 0.75rem; background: var(--primary-surface); border-radius: var(--radius-md); border: 1px solid rgba(15, 61, 62, 0.1); margin-bottom: 1rem; font-size: 0.82rem; font-weight: 600; color: var(--primary);">
          ${s.metrics}
        </div>

        <div style="font-size: 0.8rem; color: var(--muted); border-top: 1px solid var(--border-light); padding-top: 0.75rem; display: flex; justify-content: space-between;">
          <span>Founders: <strong>${s.founders}</strong></span>
          <span>Since ${s.foundedYear}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// --- 10. NEWSROOM, NOTICES & MEDIA PORTAL ---
function renderNewsPortal() {
  const container = document.getElementById('news-card-grid');
  if (!container) return;

  container.innerHTML = APP_STATE.news.map(n => `
    <div class="content-card">
      <div class="card-image-wrap" style="height: 200px;">
        <img src="${n.image}" alt="${n.title}">
        <span class="badge ${n.category.includes('Official') ? 'badge-primary' : 'badge-accent'} card-badge-floating">${n.category}</span>
      </div>
      <div class="card-body">
        <div class="card-meta-row">
          <span class="card-meta-item"><i data-lucide="calendar"></i> ${n.date}</span>
          <span class="card-meta-item"><i data-lucide="clock"></i> ${n.readTime}</span>
        </div>
        <h4 class="card-title">${n.title}</h4>
        <p class="card-text">${n.summary}</p>
        <div class="card-footer">
          <span style="font-size: 0.78rem; color: var(--muted);"><i data-lucide="user"></i> ${n.author}</span>
          <button class="btn btn-outline-primary btn-sm" onclick="readArticleModal('${n.id}')">
            Read Full Notice <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function readArticleModal(newsId) {
  const item = APP_STATE.news.find(x => x.id === newsId);
  if (!item) return;
  alert(`${item.category.toUpperCase()}: ${item.title}\n\nPublished: ${item.date} | ${item.author}\n\n${item.content}`);
}

function handlePublishArticle(e) {
  e.preventDefault();
  const title = document.getElementById('article-title-input').value;
  const category = document.getElementById('article-cat-select').value;
  const content = document.getElementById('article-content-input').value;

  const newArticle = {
    id: 'news-' + (APP_STATE.news.length + 501),
    title,
    category,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: 'GBU Incubation Editorial Team',
    readTime: '3 min read',
    image: 'assets/img/gallery_session.jpg',
    summary: content.substring(0, 140) + '...',
    content
  };

  APP_STATE.news.unshift(newArticle);
  persistState();
  closeModal('modal-publish-article');
  logAdminAction('NEWS_ARTICLE_PUBLISHED', `Published circular: "${title}" (${category})`, 'Low');
  showToast('Official news item submitted & published successfully!', 'success');
  renderNewsPortal();
  e.target.reset();
}

function reviewApplication(appId) {
  const app = APP_STATE.applications.find(a => a.id === appId);
  if (!app) return;
  alert(`Application Details (${app.id})\n\nVenture: ${app.ventureName}\nFounder: ${app.founder} (${app.email}, ${app.phone})\nStage: ${app.stage}\nRequired Support: ${app.supportNeeded}\nEvaluation Notes: ${app.notes}`);
}

function approveApplication(appId) {
  const app = APP_STATE.applications.find(a => a.id === appId);
  if (!app) return;
  app.status = 'Approved for Incubation';
  app.score = 96;
  persistState();
  renderAdminView();
  logAdminAction('APPLICATION_APPROVED', `Formally approved venture ${app.ventureName} (${app.id}) for incubation agreement.`, 'High');
  showToast(`Application ${app.id} (${app.ventureName}) formally approved for Incubation Allotment!`, 'success');
  triggerCelebration();
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  
  switchView('home');
  renderHackathonPortal();
  renderEventsPortal();
  renderStartupsDirectory();
  renderNewsPortal();
  renderAdminView();
  renderStudentPortal();
  renderFacilitiesPortal();
  renderFundingPortal();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// ============================================================
// V5 ENHANCED UI CONTROLLERS
// ============================================================

// --- Kanban Board Renderer for Admin Applications Tab ---
function renderApplicationKanban() {
  const pipeline = APP_STATE.applicationPipeline;
  if (!pipeline) return;

  const cols = [
    { key: 'inbox', label: 'New Inbox', colorClass: 'badge-info' },
    { key: 'review', label: 'Under Review', colorClass: 'badge-warning' },
    { key: 'shortlisted', label: 'Shortlisted', colorClass: 'badge-primary' },
    { key: 'approved', label: 'Approved', colorClass: 'badge-success' }
  ];

  const wrap = document.getElementById('admin-kanban-wrap');
  if (!wrap) return;

  wrap.innerHTML = `<div class="kanban-board">
    ${cols.map(col => `
      <div class="kanban-col">
        <div class="kanban-col-header">
          <span class="kanban-col-title">${col.label}</span>
          <span class="kanban-count">${(pipeline[col.key] || []).length}</span>
        </div>
        ${(pipeline[col.key] || []).map(card => `
          <div class="kanban-card">
            <div class="kanban-card-title">${card.title}</div>
            <div class="kanban-card-meta">${card.founder} — ${card.sector}</div>
            <div class="kanban-card-footer">
              <span class="kanban-priority priority-${card.priority}">${card.priority}</span>
              <span style="font-size:0.72rem;color:var(--muted);">${card.daysAgo}d ago</span>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  </div>`;
}

// --- Enhanced Student Portal Analytics ---
function renderStudentAnalytics() {
  const container = document.getElementById('student-analytics-wrap');
  if (!container) return;

  const student = APP_STATE.studentProfile;
  const hackCount = student.enrolledHackathons ? student.enrolledHackathons.length : 1;
  const evtCount = student.registeredEvents ? student.registeredEvents.length : 1;
  const certCount = student.certificatesEarned ? student.certificatesEarned.length : 2;
  const bookCount = student.labBookings ? student.labBookings.length : 2;

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: var(--primary-surface); border: 1px solid rgba(15,61,62,0.12); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center;">
        <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">${hackCount}</div>
        <div style="font-size: 0.75rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">Hackathons</div>
      </div>
      <div style="background: var(--accent-surface); border: 1px solid rgba(226,114,91,0.12); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center;">
        <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent);">${evtCount}</div>
        <div style="font-size: 0.75rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">Events</div>
      </div>
      <div style="background: var(--success-surface); border: 1px solid rgba(5,150,105,0.12); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center;">
        <div style="font-size: 1.8rem; font-weight: 800; color: var(--success);">${certCount}</div>
        <div style="font-size: 0.75rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">Certificates</div>
      </div>
      <div style="background: var(--info-surface); border: 1px solid rgba(2,132,199,0.12); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center;">
        <div style="font-size: 1.8rem; font-weight: 800; color: var(--info);">${bookCount}</div>
        <div style="font-size: 0.75rem; color: var(--muted); font-weight: 600; text-transform: uppercase;">Lab Sessions</div>
      </div>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem;">
      <h5 style="font-size: 0.88rem; margin-bottom: 1rem; color: var(--navy);">Innovation Credit Progress</h5>
      <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--muted);">
        <span>48 / 60 Credits Earned</span>
        <span style="font-weight: 700; color: var(--primary);">80%</span>
      </div>
      <div style="height: 8px; background: var(--border); border-radius: var(--radius-full); overflow: hidden;">
        <div style="width: 80%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: var(--radius-full); transition: width 1s ease;"></div>
      </div>
      <p style="font-size: 0.75rem; color: var(--muted); margin-top: 0.5rem;">12 more credits unlock the Innovation Excellence Certification</p>
    </div>
  `;
}

// --- Startup Progress Tracker ---
function renderStartupProgressTracker() {
  const container = document.getElementById('startup-tracker-wrap');
  if (!container) return;

  container.innerHTML = APP_STATE.startups.slice(0, 4).map(s => `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;">
      <div style="width: 44px; height: 44px; background: #FFF; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <img src="${s.logo}" alt="${s.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-size: 0.9rem; font-weight: 700; color: var(--navy); margin-bottom: 2px;">${s.name}</div>
        <div style="font-size: 0.75rem; color: var(--muted);">${s.sector} • ${s.stage}</div>
        <div style="height: 4px; background: var(--border); border-radius: var(--radius-full); margin-top: 8px; overflow: hidden;">
          <div style="width: ${s.stage === 'Seed Stage' ? '35%' : s.stage === 'Pre-Seed' ? '20%' : '65%'}; height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: var(--radius-full);"></div>
        </div>
      </div>
      <span class="badge ${s.stage === 'Seed Stage' ? 'badge-success' : s.stage === 'Pre-Seed' ? 'badge-warning' : 'badge-primary'}">${s.stage}</span>
    </div>
  `).join('');
}

// Call renderers on admin init
const _origRenderAdminView = typeof renderAdminView === 'function' ? renderAdminView : null;

// Extend switchAdminTab to also render kanban
const _origSwitchAdminTab = switchAdminTab;
function switchAdminTab(tabId) {
  _origSwitchAdminTab(tabId);
  if (tabId === 'admin-applications') {
    setTimeout(renderApplicationKanban, 100);
  }
}

// Initialize new renderers on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Render student analytics after a slight delay for DOM to be ready
  setTimeout(() => {
    renderStudentAnalytics();
    renderStartupProgressTracker();
  }, 300);
});
