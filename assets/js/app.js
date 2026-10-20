/* ==========================================================================
   GBU INCUBATION 2.0 - DATA & APPLICATION LOGIC (V4 SUPERCHARGED)
   Complete state store with 50+ enterprise features:
   - Full Admin Hackathon Management CRUD
   - Full Admin Event Lifecycle & Waitlist CRUD
   - Multi-role Access Simulation & Audit Logging
   - Facility Booking Approvals & Conflict Detection
   - Seed Grant Milestones & Ledger Tracking
   - Public Transparency Reports (NAAC/NIRF)
   ========================================================================== */

const APP_STATE = {
  currentRole: 'visitor', // visitor, student, judge, organizer, admin
  currentTab: 'home',
  currentAdminTab: 'admin-overview', // admin-overview, admin-hackathons, admin-events, admin-applications, admin-facilities, admin-grants, admin-audit, admin-nirf
  
  // Student Profile Data
  studentProfile: {
    name: 'Aryan Sharma',
    rollNo: '23/ICS/042',
    school: 'School of Information & Communication Technology (USICT)',
    program: 'B.Tech Computer Science & Engineering (4th Year)',
    email: 'aryan.sharma@gbu.ac.in',
    phone: '+91 98765 43210',
    attendanceCredit: '48 / 60 Innovation Credits Earned',
    mentorAssigned: 'Er. Amitava Sen (AI & Avionics)',
    activeTeam: 'Team AeroVeda (CleanTech & Drone Mobility)',
    enrolledHackathons: ['GBU Innovation Grand Challenge 2027'],
    registeredEvents: ['GBU Annual Startup Conclave 2027'],
    certificatesEarned: [
      { id: 'GBU-CERT-2027-8821', title: 'GBU Innovation Challenge Finalist', date: 'April 2027' },
      { id: 'GBU-CERT-2026-4412', title: 'Winter DeepTech Bootcamp Merit', date: 'Dec 2026' }
    ],
    labBookings: [
      { id: 'LB-101', lab: 'IoT & Drone Avionics Telemetry Lab (Block S-16)', bench: 'Bench #04', slot: 'Tomorrow, 02:00 PM - 05:00 PM', status: 'Approved' },
      { id: 'LB-102', lab: '3D Printing & Rapid Prototyping Station', bench: 'Printer Unit 2', slot: 'Friday, 10:00 AM - 01:00 PM', status: 'Confirmed' }
    ]
  },

  // Team Matching / Teammate Finder Board
  teamMatchPosts: [
    {
      id: 'tm-1',
      author: 'Priya Narang',
      course: 'M.Tech Biotech, 2nd Year',
      hackathon: 'GBU Innovation Grand Challenge 2027',
      projectConcept: 'Microbial bio-sensors for dairy pesticide detection',
      lookingFor: 'Full-stack developer (React/Node) & IoT firmware coder',
      skillsPresent: ['Biochemistry', 'Wet Lab Testing', 'Clinical Data'],
      status: 'Open (2 spots left)',
      contact: 'priya.n@gbu.ac.in'
    },
    {
      id: 'tm-2',
      author: 'Rohit Khandelwal',
      course: 'B.Tech Mechanical, 3rd Year',
      hackathon: 'AgriTech Innovation Sprint',
      projectConcept: 'Low-cost solar seed sowing robot with pneumatic drill',
      lookingFor: 'Electronics engineer (PCB design & motor controllers)',
      skillsPresent: ['CAD SolidWorks', 'Chassis Fabrication', 'Welding'],
      status: 'Open (1 spot left)',
      contact: 'rohit.k@gbu.ac.in'
    },
    {
      id: 'tm-3',
      author: 'Sneha Verma',
      course: 'MBA Innovation & Entrepreneurship',
      hackathon: 'GBU Innovation Grand Challenge 2027',
      projectConcept: 'Vernacular supply-chain micro-financing marketplace',
      lookingFor: 'FinTech algorithm developer & App designer',
      skillsPresent: ['Financial Modeling', 'Pitch Deck', 'Regulatory Compliance'],
      status: 'Open (2 spots left)',
      contact: 'sneha.v@gbu.ac.in'
    }
  ],

  // Funding & Seed Grants Disbursement Ledger
  fundingLedger: [
    {
      id: 'GRT-2027-01',
      venture: 'Puraseed Biotech Pvt Ltd',
      grantScheme: 'UP StartInUP Prototype Seed Fund',
      sanctionedAmount: '₹5,00,000',
      disbursedAmount: '₹3,50,000',
      stage: 'Tranche 2 (Lab Validation)',
      approvalDate: '2027-01-15',
      status: 'Active Disbursement',
      auditRef: 'GBURIF/FIN/2027/088'
    },
    {
      id: 'GRT-2027-02',
      venture: 'Elios Health & Mobility',
      grantScheme: 'MSME Innovation & Design Subsidy',
      sanctionedAmount: '₹4,00,000',
      disbursedAmount: '₹4,00,000',
      stage: 'Fully Disbursed',
      approvalDate: '2026-11-20',
      status: 'Completed Milestone',
      auditRef: 'GBURIF/FIN/2026/142'
    },
    {
      id: 'GRT-2027-03',
      venture: 'Terra Green Technologies',
      grantScheme: 'AIC CleanTech Pilot Grant',
      sanctionedAmount: '₹2,50,000',
      disbursedAmount: '₹1,25,000',
      stage: 'Tranche 1 (Equipment Purchase)',
      approvalDate: '2027-03-05',
      status: 'Active Disbursement',
      auditRef: 'GBURIF/FIN/2027/119'
    },
    {
      id: 'GRT-2027-04',
      venture: 'Team AeroVeda (Pre-Incubatee)',
      grantScheme: 'GBU Student Hackathon Innovation Grant',
      sanctionedAmount: '₹1,00,000',
      disbursedAmount: '₹50,000',
      stage: 'Prototype Component Procurement',
      approvalDate: '2027-04-12',
      status: 'Under Review',
      auditRef: 'GBURIF/STU/2027/034'
    }
  ],

  // Facilities & Laboratories Directory
  facilities: [
    {
      id: 'fac-1',
      name: 'IoT, Drone & Embedded Systems Lab',
      location: 'Block S-16, AIC-GBU Ground Floor',
      capacity: '24 Benches',
      equipment: ['Digital Storage Oscilloscopes', 'Drone Telemetry Test Rig', 'SMD Soldering Station', 'FPGA Kits'],
      incharge: 'Er. Amitava Sen / Tech Team',
      status: 'Open for Booking',
      image: 'assets/img/incubation_center_3.jpg'
    },
    {
      id: 'fac-2',
      name: 'Advanced Biotechnology & Analytical Testing Lab',
      location: 'School of Biotechnology Complex',
      capacity: '16 Benches',
      equipment: ['Gradient PCR Thermocycler', 'UV-Vis Spectrophotometer', 'Cold Centrifuge', 'Biosafety Cabinet Class II'],
      incharge: 'Dr. Bhupendra Kumar',
      status: 'Open for Booking',
      image: 'assets/img/incubation_center_2.jpg'
    },
    {
      id: 'fac-3',
      name: 'Rapid Prototyping & 3D Fabrication Centre',
      location: 'Mechanical Engineering Annex',
      capacity: '10 Stations',
      equipment: ['Industrial FDM 3D Printers', 'Resin SLA Printer', 'Laser Cutter 80W', 'CNC Desktop Mill'],
      incharge: 'Fabrication Officer, GBURIF',
      status: 'Open for Booking',
      image: 'assets/img/incubation_center_1.jpg'
    },
    {
      id: 'fac-4',
      name: 'High-Performance AI & Deep Learning Cluster',
      location: 'USICT Server Facility Room 204',
      capacity: '40 Concurrent Jobs',
      equipment: ['NVIDIA A100 GPU Nodes', 'Kubernetes Job Scheduler', '10 Gbps Academic Backbone', 'JupyterHub Access'],
      incharge: 'USICT Computing Directorate',
      status: 'Active High Demand',
      image: 'assets/img/gallery_session.jpg'
    }
  ],

  // Statistics & Impact
  stats: {
    startupsIncubated: 54,
    ideationStartups: 112,
    incubationSpaceSqFt: 30000,
    fundsRaisedCr: 14.8,
    hackathonsOrganized: 18,
    activeMentors: 42,
    iprFiled: 26,
    jobsCreated: 380,
    activeStudents: 620,
    grantsDisbursedCr: 2.85
  },

  // Hackathons Data
  hackathons: [
    {
      id: 'hack-2027-1',
      title: 'GBU Innovation Grand Challenge 2027',
      theme: 'AI, CleanTech, Drone & Smart Manufacturing',
      status: 'Open for Registration',
      registrationDeadline: '2027-04-15',
      eventDates: 'April 24 - 26, 2027',
      prizePool: '₹5,00,000 + Incubation Fast-track',
      venue: 'AIC-GBU Incubation Complex & Virtual',
      tracks: ['Artificial Intelligence & DeepTech', 'Smart Agriculture & Food Processing', 'CleanTech & Drone Mobility', 'Healthcare & Biotech'],
      teamsRegistered: 84,
      maxTeamSize: 4,
      bannerImg: 'assets/img/gallery_startup_meet.jpg',
      rules: 'Open to all undergraduate, postgraduate students and early-stage innovators across India. Prototype mandatory for final round.',
      rubric: [
        { id: 'crit-1', name: 'Problem Statement & Impact', weight: 20, max: 20 },
        { id: 'crit-2', name: 'Innovation & Technical Feasibility', weight: 30, max: 30 },
        { id: 'crit-3', name: 'Working Prototype / Code Quality', weight: 30, max: 30 },
        { id: 'crit-4', name: 'Commercial Viability & Presentation', weight: 20, max: 20 }
      ]
    },
    {
      id: 'hack-2027-2',
      title: 'Uttar Pradesh AgriTech & Food Innovation Sprint',
      theme: 'IoT in Precision Agriculture & Post-Harvest Supply Chain',
      status: 'Judging In Progress',
      registrationDeadline: '2027-03-01',
      eventDates: 'March 18 - 20, 2027',
      prizePool: '₹3,00,000 + Seed Grant Access',
      venue: 'School of Biotechnology & AIC-GBU',
      tracks: ['Soil Sensing', 'Cold Storage Logistics', 'Organic Traceability'],
      teamsRegistered: 62,
      maxTeamSize: 5,
      bannerImg: 'assets/img/incubation_center_1.jpg',
      rules: 'Hardware and edge IoT demonstration required before final selection panel.',
      rubric: [
        { id: 'crit-1', name: 'Agricultural Relevancy', weight: 25, max: 25 },
        { id: 'crit-2', name: 'Hardware/IoT Architecture', weight: 25, max: 25 },
        { id: 'crit-3', name: 'Field Testing Feasibility', weight: 25, max: 25 },
        { id: 'crit-4', name: 'Farmer ROI Model', weight: 25, max: 25 }
      ]
    }
  ],

  // Submitted Hackathon Projects for Evaluation
  hackathonSubmissions: [
    {
      id: 'sub-101',
      hackathonId: 'hack-2027-1',
      teamName: 'Team AeroVeda',
      leadName: 'Aryan Sharma',
      leadEmail: 'aryan.sharma@gbu.ac.in',
      projectTitle: 'Autonomous Drone Pollination & Crop Health Telemetry',
      track: 'CleanTech & Drone Mobility',
      repoUrl: 'https://github.com/aeroveda-gbu/drone-telemetry',
      demoUrl: 'https://aeroveda-telemetry.web.app',
      submittedAt: '2027-04-10 14:32',
      status: 'Submitted',
      scores: { 'crit-1': 18, 'crit-2': 28, 'crit-3': 26, 'crit-4': 17 },
      totalScore: 89,
      feedback: 'Excellent telemetry payload integration and live demonstration.'
    },
    {
      id: 'sub-102',
      hackathonId: 'hack-2027-1',
      teamName: 'NeuralCare Labs',
      leadName: 'Dr. Radhika Sen',
      leadEmail: 'radhika@neuralcare.io',
      projectTitle: 'Edge-AI Portable Retinal Diagnostic Camera',
      track: 'Healthcare & Biotech',
      repoUrl: 'https://github.com/neuralcare/edge-vision',
      demoUrl: 'https://demo.neuralcare.io',
      submittedAt: '2027-04-11 11:20',
      status: 'Submitted',
      scores: { 'crit-1': 19, 'crit-2': 29, 'crit-3': 29, 'crit-4': 18 },
      totalScore: 95,
      feedback: 'Outstanding clinical efficacy data and edge model compression.'
    },
    {
      id: 'sub-103',
      hackathonId: 'hack-2027-1',
      teamName: 'BioRecycle CleanTech',
      leadName: 'Mohit Verma',
      leadEmail: 'mohit.v@gmail.com',
      projectTitle: 'Microbial Bioplastic Conversion from Agri Waste',
      track: 'Smart Agriculture & Food Processing',
      repoUrl: 'https://github.com/biorecycle/process-design',
      demoUrl: 'https://biorecycle.org',
      submittedAt: '2027-04-12 16:45',
      status: 'Submitted',
      scores: { 'crit-1': 17, 'crit-2': 24, 'crit-3': 23, 'crit-4': 16 },
      totalScore: 80,
      feedback: 'Solid chemistry foundation, requires scale pilot unit.'
    }
  ],

  // Events & Programs
  events: [
    {
      id: 'evt-301',
      title: 'GBU Annual Startup Conclave & Angel Pitch Fest 2027',
      category: 'Conclave & Demo Day',
      date: 'May 14, 2027',
      time: '09:30 AM - 05:30 PM IST',
      venue: 'Main University Auditorium, Gautam Buddha University',
      mode: 'In-Person (Greater Noida Campus)',
      capacity: 350,
      registeredCount: 284,
      image: 'assets/img/gallery_awards.jpg',
      badge: 'Registrations Open',
      speakers: ['Prof. Ravindra Kumar Sinha (Vice Chancellor)', 'Saurabh Srivastava (Angel Investor)', 'Dr. Neha Tandon (Tech Evangelist)'],
      description: 'The flagship entrepreneurship showcase of western UP featuring 30+ curated startups pitching before national venture capital funds, state startup mission officials, and ecosystem leaders.'
    },
    {
      id: 'evt-302',
      title: 'Workshop: IP Filing, Patent Drafting & Trademark Strategy',
      category: 'Legal & IPR Workshop',
      date: 'April 28, 2027',
      time: '02:00 PM - 05:00 PM IST',
      venue: 'Seminar Hall 3, AIC-GBU Centre',
      mode: 'Hybrid (Campus + Zoom Live)',
      capacity: 120,
      registeredCount: 115,
      image: 'assets/img/gallery_session.jpg',
      badge: 'Limited Seats',
      speakers: ['Adv. Meenakshi Sharma (Patent Attorney, Delhi High Court)'],
      description: 'Hands-on training session on patent search methodologies, provisional drafting, and MSME fee subsidies for deeptech inventions.'
    },
    {
      id: 'evt-303',
      title: 'Masterclass: Unit Economics & Financial Modeling for Seed Startups',
      category: 'Founder Bootcamp',
      date: 'May 06, 2027',
      time: '11:00 AM - 01:30 PM IST',
      venue: 'Virtual Interactive Classroom',
      mode: 'Virtual (Zoom)',
      capacity: 200,
      registeredCount: 172,
      image: 'assets/img/gallery_lab.jpg',
      badge: 'Registrations Open',
      speakers: ['Kunal Kapoor (Partner, Matrix Growth)'],
      description: 'Demystifying CAC, LTV, contribution margins, and investor readiness benchmarks for pre-seed and seed founders.'
    }
  ],

  // Official News & Announcements
  news: [
    {
      id: 'news-501',
      title: 'AIC-GBU Signs MoU with Government Startup Mission for ₹5 Crore Seed Corpus',
      category: 'Official Notice',
      date: 'April 14, 2027',
      author: 'GBURIF Secretariat',
      readTime: '3 min read',
      image: 'assets/img/gallery_event_1.jpg',
      summary: 'Gautam Buddha University Research and Innovation Foundation establishes an active seed deployment facility to back student-led prototypes in robotics and green chemistry.',
      content: 'The AIC-GBU Incubation Centre (GBURIF) officially formalized an agreement to foster regional venture creation. Under this framework, selected ideation cohorts will receive non-dilutive prototype grants up to ₹5 Lakh alongside access to university fabrication laboratories.'
    },
    {
      id: 'news-502',
      title: 'Portfolio Startup Puraseed Biotech Secures Pre-Series A Funding',
      category: 'Startup Success Story',
      date: 'April 02, 2027',
      author: 'Incubation Communications',
      readTime: '4 min read',
      image: 'assets/logos/puraseed.png',
      summary: 'Incubatee Puraseed Biotech completes successful pilot installations in 4 states, securing ₹2.2 Crores from leading agritech syndicate.',
      content: 'Founded by GBU alumni, Puraseed has developed an organic seed fortification formula reducing fungal crop infestation by 42%. The startup incubated at GBURIF in 2025.'
    },
    {
      id: 'news-503',
      title: 'Call for Applications: Summer Cohort 2027 Incubation Intake',
      category: 'Program Announcement',
      date: 'March 25, 2027',
      author: 'Program Management Directorate',
      readTime: '2 min read',
      image: 'assets/img/incubation_center_2.jpg',
      summary: 'Structured 12-month incubation program with 30,000 sq.ft co-working infrastructure, cloud credits, and mentor access now open.',
      content: 'Applications are invited from students, researchers, alumni, and external entrepreneurs in NCR for physical and virtual incubation programs.'
    }
  ],

  // Incubated Startups Directory
  startups: [
    {
      id: 'stp-1',
      name: 'Puraseed Biotech',
      sector: 'AgriTech & BioSolutions',
      stage: 'Seed Funded',
      foundedYear: '2025',
      founders: 'Er. Sandeep Bhati & Team',
      logo: 'assets/logos/puraseed.png',
      summary: 'Eco-friendly biochemical seed coating enhancing germination speed and soil immunity.',
      metrics: '₹2.2 Cr Raised • 4 Patents Filed'
    },
    {
      id: 'stp-2',
      name: 'Elios Health & Mobility',
      sector: 'Healthcare & Assistive Tech',
      stage: 'Incubated (Early Growth)',
      foundedYear: '2025',
      founders: 'Pooja Kashyap',
      logo: 'assets/logos/elios_health.png',
      summary: 'Affordable robotic rehabilitation wheelchairs and ambulatory sensor kits.',
      metrics: 'Pilot at 3 Hospitals • CDSCO Registered'
    },
    {
      id: 'stp-3',
      name: 'Koyal FM Community Media',
      sector: 'EdTech & Digital Media',
      stage: 'Commercialized',
      foundedYear: '2024',
      founders: 'Vikas Sharma',
      logo: 'assets/logos/koyalfm.png',
      summary: 'Hyperlocal rural community podcasting and vernacular skill transmission network.',
      metrics: '120k Monthly Listeners • Profitable'
    },
    {
      id: 'stp-4',
      name: 'Soha Organic Foods',
      sector: 'Food Processing & Clean Agri',
      stage: 'Incubated',
      foundedYear: '2025',
      founders: 'Amanpreet Singh',
      logo: 'assets/logos/sohaorganic.png',
      summary: 'Solar-dehydrated nutritional micro-greens and zero-preservative functional powders.',
      metrics: 'FSSAI Certified • 18 Retail Partners'
    },
    {
      id: 'stp-5',
      name: 'Studlence Learning Tech',
      sector: 'EdTech & AI Tutoring',
      stage: 'Ideation to Validation',
      foundedYear: '2026',
      founders: 'Kavita Rawat',
      logo: 'assets/logos/studlence.png',
      summary: 'Adaptive vernacular stem evaluation platform for state board students.',
      metrics: '14 Schools Onboarded'
    },
    {
      id: 'stp-6',
      name: 'Terra Green Technologies',
      sector: 'CleanTech & Waste Recycling',
      stage: 'Incubated',
      foundedYear: '2025',
      founders: 'Nikhil Tyagi',
      logo: 'assets/logos/terra.png',
      summary: 'Circular recycling process converting industrial plastic sludges into structural pavers.',
      metrics: '25 Tonnes Processed • CPCB Compliant'
    }
  ],

  // Incubation Applications
  applications: [
    {
      id: 'APP-2027-048',
      ventureName: 'AeroVeda Telemetry',
      founder: 'Aryan Sharma',
      email: 'aryan.sharma@gbu.ac.in',
      phone: '+91 98765 43210',
      sector: 'Drone Tech & Smart Mobility',
      stage: 'Prototype Ready',
      supportNeeded: 'Physical Lab Space, Seed Grant, Mentor',
      submittedDate: '2027-04-14',
      status: 'Shortlisted for Pitch',
      score: 88,
      notes: 'Reviewed by Tech Advisory Committee; recommendation for lab allotment.'
    },
    {
      id: 'APP-2027-049',
      ventureName: 'BioRecycle Plastics',
      founder: 'Mohit Verma',
      email: 'mohit.v@gmail.com',
      phone: '+91 98112 34567',
      sector: 'CleanTech & Environmental',
      stage: 'Ideation',
      supportNeeded: 'Mentorship, Patent Assistance',
      submittedDate: '2027-04-15',
      status: 'Under Review',
      score: 72,
      notes: 'Assigned to School of Biotechnology evaluation panel.'
    },
    {
      id: 'APP-2027-050',
      ventureName: 'PulseAI NeuroCare',
      founder: 'Dr. Radhika Sen',
      email: 'radhika@neuralcare.io',
      phone: '+91 99990 12345',
      sector: 'Healthcare & AI',
      stage: 'Validation',
      supportNeeded: 'Hospital Clinical Trials, Compliance, Seed Funding',
      submittedDate: '2027-04-16',
      status: 'Approved',
      score: 94,
      notes: 'Board approved formal incubation agreement and space allocation in Block S-16.'
    }
  ],

  // Mentors Directory
  mentors: [
    {
      name: 'Prof. Ravindra Kumar Sinha',
      title: 'Vice Chancellor, Gautam Buddha University',
      expertise: 'Photonics, Nanotechnology, Academic Innovation',
      organization: 'GBU / GBURIF Governing Council',
      img: 'assets/img/vcsir.png'
    },
    {
      name: 'Dr. Bhupendra Kumar',
      title: 'Dean & Incubation Advisor',
      expertise: 'Biotechnology, Intellectual Property, Bio-entrepreneurship',
      organization: 'School of Biotechnology, GBU',
      img: 'assets/img/team-1.jpg'
    },
    {
      name: 'Er. Amitava Sen',
      title: 'Principal Technology Architect',
      expertise: 'AI Systems, Cloud Infrastructure, Drone Autonomy',
      organization: 'Industry Partner & Mentor-in-Residence',
      img: 'assets/img/team-3.jpg'
    },
    {
      name: 'Ms. Sunita Deshmukh',
      title: 'Venture Partner & Legal Counsel',
      expertise: 'Startup Corporate Law, Term Sheets, Equity Structuring',
      organization: 'VentureEdge Law Advisory',
      img: 'assets/img/team-4.jpg'
    }
  ],

  // Event Registrations
  eventRegistrations: [
    {
      regId: 'EVT-REG-8821',
      eventId: 'evt-301',
      eventTitle: 'GBU Annual Startup Conclave & Angel Pitch Fest 2027',
      userName: 'Aryan Sharma',
      email: 'aryan.sharma@gbu.ac.in',
      institution: 'Gautam Buddha University (Student)',
      passType: 'Student Delegate',
      qrValue: 'GBU-CONF-8821-ARYAN',
      checkInStatus: 'Checked In',
      registeredAt: '2027-04-10 10:15'
    },
    {
      regId: 'EVT-REG-8822',
      eventId: 'evt-301',
      eventTitle: 'GBU Annual Startup Conclave & Angel Pitch Fest 2027',
      userName: 'Priya Narang',
      email: 'priya.n@outlook.com',
      institution: 'IIT Roorkee',
      passType: 'Founder Showcase',
      qrValue: 'GBU-CONF-8822-PRIYA',
      checkInStatus: 'Pending',
      registeredAt: '2027-04-11 12:40'
    }
  ],

  // System Audit Logs (New Enterprise Feature)
  auditLogs: [
    {
      id: 'LOG-9401',
      timestamp: '2027-04-20 18:24:12',
      actor: 'Admin (Director GBURIF)',
      action: 'APPLICATION_APPROVED',
      details: 'Approved incubation cohort intake for APP-2027-050 (PulseAI NeuroCare). Allocated Lab S-16.',
      severity: 'High'
    },
    {
      id: 'LOG-9402',
      timestamp: '2027-04-20 16:45:00',
      actor: 'Er. Amitava Sen (Judge)',
      action: 'RUBRIC_SCORE_UPDATED',
      details: 'Updated rubric scores for Team AeroVeda (sub-101) to 89/100.',
      severity: 'Medium'
    },
    {
      id: 'LOG-9403',
      timestamp: '2027-04-20 14:10:33',
      actor: 'Event Desk Scanner',
      action: 'QR_CHECKIN_VERIFIED',
      details: 'Attendee Aryan Sharma (EVT-REG-8821) verified at Main Auditorium Door 1.',
      severity: 'Low'
    },
    {
      id: 'LOG-9404',
      timestamp: '2027-04-19 11:30:19',
      actor: 'Accounts & Grants Division',
      action: 'GRANT_TRANCHE_DISBURSED',
      details: 'Disbursed ₹1,25,000 to Terra Green Technologies (Ref: GBURIF/FIN/2027/119).',
      severity: 'High'
    }
  ]
};

// LocalStorage Hydration
function loadStateFromStorage() {
  try {
    const saved = localStorage.getItem('GBU_INCUBATION_APP_STATE_V4');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(APP_STATE, parsed);
    }
  } catch (e) {
    console.warn('Could not read localStorage:', e);
  }
}

function persistState() {
  try {
    localStorage.setItem('GBU_INCUBATION_APP_STATE_V4', JSON.stringify(APP_STATE));
  } catch (e) {
    console.warn('Could not save localStorage:', e);
  }
}

// Global UI Navigation
function switchView(viewName) {
  APP_STATE.currentTab = viewName;
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });
  
  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update Nav Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    }
  });

  if (viewName === 'student') {
    renderStudentPortal();
  } else if (viewName === 'facilities') {
    renderFacilitiesPortal();
  } else if (viewName === 'funding') {
    renderFundingPortal();
  } else if (viewName === 'admin') {
    renderAdminView();
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Global Role Switcher
function setRole(role) {
  APP_STATE.currentRole = role;
  document.querySelectorAll('.role-pill').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-role') === role) {
      btn.classList.add('active');
    }
  });

  const badge = document.getElementById('current-role-badge');
  if (badge) {
    badge.innerText = role.toUpperCase();
  }

  showToast(`Switched active view role to: ${role.toUpperCase()}`, 'info');

  if (role === 'student') {
    switchView('student');
  } else if (role === 'admin' || role === 'manager') {
    switchView('admin');
  }

  updateRoleAccess();
}

function updateRoleAccess() {
  const role = APP_STATE.currentRole;
  const adminNav = document.getElementById('nav-admin-link');
  if (adminNav) {
    if (['organizer', 'judge', 'manager', 'admin'].includes(role)) {
      adminNav.style.display = 'inline-flex';
    } else {
      adminNav.style.display = 'none';
    }
  }

  if (APP_STATE.currentTab === 'admin') {
    renderAdminView();
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconName = 'check-circle';
  if (type === 'info') iconName = 'info';
  if (type === 'warning') iconName = 'alert-triangle';
  if (type === 'danger') iconName = 'alert-circle';

  toast.innerHTML = `
    <div style="color: var(--${type === 'info' ? 'info' : (type === 'warning' ? 'warning' : (type === 'danger' ? 'danger' : 'success'))})">
      <i data-lucide="${iconName}"></i>
    </div>
    <div style="flex-grow: 1; font-size: 0.88rem; font-weight: 500; color: var(--navy)">
      ${message}
    </div>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: var(--muted)">
      <i data-lucide="x" style="width: 16px; height: 16px;"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.transition = 'all 250ms ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 250);
    }
  }, 4000);
}

function triggerCelebration() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// ============================================================
// V5 ENHANCED FEATURES - Additional Data & Functions
// ============================================================

// Mentor directory data
APP_STATE.mentors = APP_STATE.mentors || [
  { id: 'ment-1', name: 'Er. Amitava Sen', title: 'AI & Avionics Principal Architect', org: 'Mentor-in-Residence, AIC-GBU', expertise: ['Drone Systems', 'Embedded AI', 'Telemetry', 'PCB Design'], mentees: 12, rating: 4.9, sessions: 84, photo: 'assets/img/team-3.jpg' },
  { id: 'ment-2', name: 'Dr. Bhupendra Kumar', title: 'Dean, School of Biotechnology', org: 'GBU Faculty & IP Advisor', expertise: ['Patent Filing', 'Biotech R&D', 'IP Strategy', 'DSIR'], mentees: 9, rating: 4.7, sessions: 63, photo: 'assets/img/team-1.jpg' },
  { id: 'ment-3', name: 'Ms. Sunita Deshmukh', title: 'Startup Legal & Term Sheet Advisor', org: 'Founder, Deshmukh & Partners LLP', expertise: ['Term Sheets', 'ESOP', 'Legal', 'Compliance'], mentees: 7, rating: 4.8, sessions: 51, photo: 'assets/img/team-2.jpg' },
  { id: 'ment-4', name: 'Saurabh Srivastava', title: 'Angel Investor & Unit Economics', org: 'Partner, IAN & Inflection Point', expertise: ['Angel Funding', 'Unit Economics', 'GTM', 'Pitching'], mentees: 15, rating: 5.0, sessions: 120, photo: 'assets/img/team-4.jpg' }
];

// Application pipeline stages for Kanban
APP_STATE.applicationPipeline = APP_STATE.applicationPipeline || {
  inbox: [
    { id: 'APP-2027-054', title: 'NovaPulse Energy', founder: 'Aryan K.', sector: 'CleanTech', priority: 'high', daysAgo: 2 },
    { id: 'APP-2027-053', title: 'AgroSmart UP', founder: 'Meera P.', sector: 'AgriTech', priority: 'medium', daysAgo: 4 },
  ],
  review: [
    { id: 'APP-2027-052', title: 'MedTrace Labs', founder: 'Rohit V.', sector: 'HealthTech', priority: 'high', daysAgo: 7 },
    { id: 'APP-2027-050', title: 'Vernacular AI', founder: 'Sneha M.', sector: 'EdTech', priority: 'medium', daysAgo: 10 }
  ],
  shortlisted: [
    { id: 'APP-2027-048', title: 'ClearAir Sensors', founder: 'Kunal T.', sector: 'CleanTech', priority: 'low', daysAgo: 14 }
  ],
  approved: [
    { id: 'APP-2027-045', title: 'Puraseed Biotech', founder: 'Ravi S.', sector: 'AgriTech', priority: 'low', daysAgo: 30 },
    { id: 'APP-2027-040', title: 'Elios Health', founder: 'Divya G.', sector: 'HealthTech', priority: 'low', daysAgo: 45 }
  ]
};

// ============================================================
// GBU INCUBATION 2.0 - ENHANCED UI CONTROLS & INTERACTION V5
// ============================================================

// --- Scroll Progress Bar ---
window.addEventListener('scroll', function() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = pct + '%';
});

// --- Global Search ---
function openGlobalSearch() {
  const overlay = document.getElementById('global-search-overlay');
  if (overlay) {
    overlay.classList.add('open');
    setTimeout(() => {
      const inp = document.getElementById('global-search-input');
      if (inp) {
        inp.focus();
        inp.select();
      }
    }, 50);
  }
}

function closeGlobalSearch(evt) {
  if (evt && evt.target !== document.getElementById('global-search-overlay')) return;
  const overlay = document.getElementById('global-search-overlay');
  if (overlay) overlay.classList.remove('open');
}

document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    openGlobalSearch();
  }
  if (e.key === 'Escape') {
    document.getElementById('global-search-overlay')?.classList.remove('open');
    document.getElementById('notif-dropdown')?.classList.remove('open');
  }
});

function handleGlobalSearch(e) {
  const q = e.target.value.toLowerCase().trim();
  const items = document.querySelectorAll('#search-results-wrap .search-result-item');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
  });
}

// --- Notifications ---
function toggleNotifications() {
  const dd = document.getElementById('notif-dropdown');
  if (dd) dd.classList.toggle('open');
}

function clearNotifications(e) {
  if (e) e.stopPropagation();
  document.querySelectorAll('.notif-item').forEach(i => i.classList.remove('unread'));
  const badge = document.getElementById('notif-count');
  if (badge) badge.style.display = 'none';
  const dd = document.getElementById('notif-dropdown');
  if (dd) dd.classList.remove('open');
  showToast('All notifications marked as read', 'info');
}

document.addEventListener('click', function(e) {
  const bell = document.querySelector('.notification-bell-wrap');
  if (bell && !bell.contains(e.target)) {
    document.getElementById('notif-dropdown')?.classList.remove('open');
  }
});

// --- Floating Action Button (FAB) ---
let fabOpen = false;
function toggleFab() {
  fabOpen = !fabOpen;
  const subGroup = document.getElementById('fab-sub-group');
  const mainBtn = document.getElementById('fab-main-btn');
  if (subGroup) subGroup.classList.toggle('open', fabOpen);
  if (mainBtn) {
    mainBtn.style.background = fabOpen ? 'var(--accent)' : 'var(--primary)';
    mainBtn.innerHTML = fabOpen
      ? '<i data-lucide="x" style="width:22px;height:22px;"></i>'
      : '<i data-lucide="plus" style="width:22px;height:22px;"></i>';
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeFab() {
  fabOpen = false;
  const subGroup = document.getElementById('fab-sub-group');
  const mainBtn = document.getElementById('fab-main-btn');
  if (subGroup) subGroup.classList.remove('open');
  if (mainBtn) {
    mainBtn.style.background = 'var(--primary)';
    mainBtn.innerHTML = '<i data-lucide="plus" style="width:22px;height:22px;"></i>';
    if (window.lucide) window.lucide.createIcons();
  }
}

// --- Interactive Chat Assistant ---
let chatOpen = false;
function toggleChat() {
  chatOpen = !chatOpen;
  const widget = document.getElementById('chat-widget');
  if (widget) widget.classList.toggle('open', chatOpen);
  if (chatOpen) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) chatInput.focus();
  }
}

const chatResponses = {
  'hackathon': 'You can register teams for the GBU Innovation Grand Challenge 2027! Cash prizes: ₹5,00,000 + incubation support. Click the Hackathons tab in the top navigation to start.',
  'lab': 'To book a prototyping lab bench, go to the Student Portal or Labs & Facilities tab and click "Reserve Lab Bench Slot" (Block S-16 IoT Lab, 3D Fab Lab, Biotech Testing Lab).',
  'incubation': 'To apply for formal incubation allotment, click the "Apply for Incubation Cohort" button on the homepage or open the multi-step intake wizard.',
  'grant': 'Seed grants are available through UP StartInUP (up to ₹5 Lakh), NIDHI-PRAYAS (up to ₹10 Lakh), and SISFS schemes. Check the Grants & Funding ledger tab for active disbursements.',
  'event': 'Upcoming events include the Annual Startup Conclave 2027 on May 14 at the GBU Main Auditorium. Register in the Events & Programs portal to get your QR pass instantly.',
  'mentor': 'You can request 1-on-1 mentor sessions from the Student Portal or click "Request Mentor Session" in the Floating Action Button menu.',
  'student': 'The Student Innovation Portal gives you access to co-founder matching, bench booking, attendance credits (48/60 earned), and digital certificates.'
};

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;
  const msg = input.value.trim();
  input.value = '';
  const messages = document.getElementById('chat-messages');
  if (!messages) return;

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = msg;
  messages.appendChild(userBubble);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';
    const lower = msg.toLowerCase();
    let response = 'I can help with hackathon registration, lab bookings, incubation applications, seed grants, events, and mentorship. What would you like to explore?';
    for (const [key, val] of Object.entries(chatResponses)) {
      if (lower.includes(key)) { response = val; break; }
    }
    botBubble.textContent = response;
    messages.appendChild(botBubble);
    messages.scrollTop = messages.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }, 500);
}

// --- FAQ Accordion ---
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) {
    item.classList.add('open');
  }
}
