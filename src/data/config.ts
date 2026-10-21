import type { IconName } from './icons';

export const site = {
  name: 'Vinuga Kisath',
  handle: 'Vinuga_K',
  title: 'Vinuga Kisath — Cybersecurity & Network Engineering',
  tagline: 'Understanding systems. Securing networks. Building practical infrastructure.',
  description: 'Personal portfolio and technical platform of Vinuga Kisath — Sri Lankan network technology & cyber security student at ICBT / Cardiff Met, and IT intern at Powernet (Pvt) Ltd.',
  url: 'https://vinugakisath.site/',
  location: 'Colombo, Sri Lanka',
  timezone: 'Asia/Colombo (UTC+5:30)',
  status: 'Available for technical opportunities & engineering collaboration',
  role: 'Cybersecurity & Network Engineering Student',
  company: 'Powernet (Pvt) Ltd',
  institution: 'ICBT Campus / Cardiff Metropolitan University',
} as const;

export const navSections = [
  { id: 'about', label: 'About', port: '01' },
  { id: 'experience', label: 'Experience', port: '02' },
  { id: 'topology', label: 'Systems Lab', port: '03' },
  { id: 'projects', label: 'Projects', port: '04' },
  { id: 'skills', label: 'Skills Matrix', port: '05' },
  { id: 'labnotes', label: 'Lab Notes', port: '06' },
  { id: 'contact', label: 'Contact', port: '07' },
] as const;

export const heroMetrics = [
  { label: 'Academic Standing', value: 'Higher Diploma Candidate', sub: 'ICBT / Cardiff Met' },
  { label: 'Practical Experience', value: 'IT Intern', sub: 'Powernet (Pvt) Ltd' },
  { label: 'Cisco Track', value: 'CCNA in Progress', sub: 'Routing, Switching & Sec' },
  { label: 'Primary Focus', value: 'Network Security', sub: 'Firewalls, Linux, Systems' },
] as const;

export const experience = {
  role: 'IT Intern',
  company: 'Powernet (Pvt) Ltd',
  period: 'Present',
  location: 'Sri Lanka',
  summary:
    'Gaining hands-on enterprise IT experience across enterprise infrastructure, network equipment deployment, edge firewall management, power protection systems, and technical documentation under engineering mentorship.',
  areas: [
    {
      title: 'Enterprise Network & Cable Infrastructure',
      badge: 'Supervised',
      description:
        'Hands-on exposure to physical network plant installation: rack cable management, patch panel termination, switch port patching, and VLAN continuity verification across client offices.',
    },
    {
      title: 'Edge Firewall & Security Policies',
      badge: 'Assisted & Audited',
      description:
        'Assisting senior technicians with edge firewall ruleset audits, stateful packet inspection (SPI) verification, NAT/PAT address mappings, and access control list (ACL) implementations.',
    },
    {
      title: 'Power Conditioning & UPS Systems',
      badge: 'Direct Exposure',
      description:
        'Performing battery diagnostic testing, runtime estimations, load monitoring, and preventative maintenance on rackmount UPS (uninterruptible power supply) systems guarding client server infrastructure.',
    },
    {
      title: 'Technical Support & Systems Documentation',
      badge: 'Operational',
      description:
        'Triaging workstation hardware/software issues, provisioning operating systems, resolving connectivity errors, and drafting standard operating procedures (SOPs) for client handover.',
    },
  ],
} as const;

export const education = {
  degree: 'Higher Diploma in Network Technology and Cyber Security',
  institution: 'ICBT Campus in collaboration with Cardiff Metropolitan University',
  status: 'In Progress',
  overview:
    'Rigorous academic coursework combining network architecture, data communications, cyber security defense, system administration, and practical lab experimentation.',
  modules: [
    'Routing and Switching Architectures',
    'Network Security Principles & Threat Defense',
    'Linux Systems Administration',
    'Information Systems Security & Governance',
    'Object-Oriented Programming & Scripting',
  ],
  certificationNote:
    'Currently preparing for the Cisco CCNA (200-301) examination through hands-on packet tracer topologies and protocol labbing. No certification earned yet.',
} as const;

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  meta: string;
  category: 'production' | 'tool' | 'platform' | 'concept' | 'community';
  status: string;
  description: string;
  highlights: readonly string[];
  tech: readonly string[];
  repo?: string;
  demo?: string;
}

export const projects: readonly ProjectItem[] = [
  {
    id: 'powernet-website',
    title: 'Powernet Corporate Web Platform',
    tagline: 'Production company website with Git-backed Keystatic CMS and staging pipeline',
    meta: 'Astro · Keystatic CMS · TypeScript · GitHub Actions',
    category: 'production',
    status: 'Live & Maintained',
    description:
      'Engineered the official corporate website for Powernet (Pvt) Ltd. Built with Astro and Keystatic CMS to provide a zero-database, Git-native content management experience where non-technical staff can update service offerings directly into version control. Configured an automated staging pipeline for pre-release verification.',
    highlights: [
      'Zero database overhead with Git-backed content storage',
      'Automated staging deployment for stakeholder review before live push',
      'Optimized performance achieving 100/100 Core Web Vitals score',
    ],
    tech: ['Astro', 'TypeScript', 'Keystatic CMS', 'CSS Tokens', 'GitHub Actions'],
    demo: 'https://powernet.lk',
  },
  {
    id: 'service-document-compiler',
    title: 'Service Document Compiler',
    tagline: 'Zero-server client tool compiling technical records into printable A4 JPGs',
    meta: 'HTML5 · Canvas API · Vanilla JavaScript · CSS',
    category: 'tool',
    status: 'Production Utility',
    description:
      'Engineered an offline-first, single-file browser utility designed for field technicians to record service visits, hardware replacements, and client sign-offs. The tool dynamically compiles multi-section forms onto an HTML5 Canvas and exports pixel-perfect A4 documents with zero server dependencies or software installation required.',
    highlights: [
      '100% client-side execution ensuring zero external data leakage',
      'Embedded Canvas rasterization producing standard A4 high-res exports',
      'Portable single-file bundle functioning without internet connectivity',
    ],
    tech: ['HTML5', 'Vanilla JavaScript', 'HTML Canvas API', 'CSS Grid', 'Offline-First'],
  },
  {
    id: 'personal-platform',
    title: 'Personal Platform & Systems Engine',
    tagline: 'Astro 5 technical showcase with interactive 3D network topology & command palette',
    meta: 'Astro 5 · TypeScript · Canvas 3D · Vanilla CSS',
    category: 'platform',
    status: 'Active · vinugakisath.site',
    description:
      'The website you are currently browsing. Redesigned as an editorial technical platform celebrating network engineering and cybersecurity principles. Features a custom 60fps 3D canvas simulating real-time packet transmissions across enterprise network zones, a full keyboard-accessible command palette (⌘K), and authentic field notes.',
    highlights: [
      'Pure Canvas 2.5D network graph with interactive node inspection',
      'Global command palette (⌘K) with keyboard navigation & fuzzy search',
      'Accessible, high-contrast dark aesthetic with zero heavy 3D bundles',
    ],
    tech: ['Astro 5', 'TypeScript', 'Canvas API', 'Vanilla CSS Tokens', 'Vercel'],
    repo: 'https://github.com/Vinuga530/personal_site',
    demo: 'https://vinugakisath.site',
  },
  {
    id: 'slt-usage-meter',
    title: 'SLT Broadband Telemetry Monitor',
    tagline: 'Community enhancement for automated ISP quota and bandwidth tracking',
    meta: 'JavaScript · DOM Automation · Telemetry',
    category: 'community',
    status: 'Open Source',
    description:
      'Enhanced and maintained an open-source usage meter utility for Sri Lanka Telecom (SLT) broadband accounts. Reverse-engineered web portal payloads to extract real-time daily quota burn rates, peak vs off-peak consumption metrics, and bandwidth projection telemetry.',
    highlights: [
      'Automated session authentication against ISP portals',
      'Data visualization distinguishing peak from off-peak allowance',
      'Zero third-party tracking or credential persistence',
    ],
    tech: ['JavaScript', 'REST APIs', 'Data Parsing', 'Browser Scripting'],
    repo: 'https://github.com/Vinuga530/slt_usage_meter',
  },
  {
    id: 'ticketing-system-concept',
    title: 'IT Helpdesk & Triage Architecture',
    tagline: 'System architecture concept to eliminate high-volume phone call bottlenecks',
    meta: 'Systems Architecture · ITIL Principles · Process Design',
    category: 'concept',
    status: 'Architecture Specification',
    description:
      'Synthesized practical insights from daily IT support at Powernet into a structured ticketing system concept. Designed ticket status lifecycles, SLA escalation matrices, priority matrix scoring (Urgency vs Impact), and spare parts inventory tracking to eliminate phone-triage bottlenecks.',
    highlights: [
      'Structured 5-stage ticket lifecycle with automatic escalation triggers',
      'Impact vs Urgency priority matrix aligning with ITIL standards',
      'Hardware loaner & replacement tracking schema',
    ],
    tech: ['Systems Analysis', 'ITIL Best Practices', 'Information Architecture', 'Workflow Modeling'],
  },
] as const;

export interface SkillItem {
  name: string;
  detail: string;
  verified: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  items: readonly SkillItem[];
}

export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'networking',
    name: 'Network Engineering',
    icon: 'icon-network',
    description: 'Foundational architectures, routing, switching, and protocol stack operations.',
    items: [
      { name: 'TCP/IP & OSI Model', detail: 'Deep comprehension across Layer 1 through Layer 7', verified: true },
      { name: 'IPv4 Subnetting & CIDR', detail: 'VLSM calculations, address planning & network partitioning', verified: true },
      { name: 'VLANs & 802.1Q Trunking', detail: 'Broadcast domain isolation & trunk port encapsulation', verified: true },
      { name: 'Inter-VLAN Routing', detail: 'Router-on-a-stick & Layer 3 switch configurations', verified: true },
      { name: 'NAT & PAT', detail: 'Static, dynamic, and port address translation for edge routing', verified: true },
      { name: 'STP (802.1D / 802.1w)', detail: 'Loop prevention, root bridge selection & port states', verified: true },
      { name: 'Cisco Packet Tracer / GNS3', detail: 'Topology simulation, packet flow tracing & debugging', verified: true },
    ],
  },
  {
    id: 'security',
    name: 'Cybersecurity & Defense',
    icon: 'icon-shield',
    description: 'Threat mitigation, firewall policies, baseline hardening, and packet inspection.',
    items: [
      { name: 'Firewall Administration', detail: 'Stateful packet inspection (SPI), rule ordering & zones', verified: true },
      { name: 'Access Control Lists (ACLs)', detail: 'Standard and extended IPv4 packet filtering policies', verified: true },
      { name: 'Port Auditing & Nmap', detail: 'Active reconnaissance, socket discovery & banner verification', verified: true },
      { name: 'Network Hardening', detail: 'Disabling unused protocols, SSH key auth, and security baselines', verified: true },
      { name: 'Threat Vector Analysis', detail: 'Mechanisms behind ARP spoofing, MITM, DNS poisoning & DoS', verified: true },
      { name: 'WireShark Packet Analysis', detail: 'Deep packet inspection, TCP handshake & TLS handshake tracing', verified: true },
    ],
  },
  {
    id: 'systems',
    name: 'Systems & Infrastructure',
    icon: 'icon-cpu',
    description: 'Operating systems, Linux administration, and enterprise physical hardware.',
    items: [
      { name: 'Linux (Debian / Ubuntu)', detail: 'CLI navigation, user permissions, systemd services & cron', verified: true },
      { name: 'CLI Diagnostics', detail: 'Troubleshooting with ss, netstat, ip, mtr, traceroute, curl', verified: true },
      { name: 'Rack & Patch Infrastructure', detail: 'Patch panel punching, cable testing & structured rack layouts', verified: true },
      { name: 'UPS Power Systems', detail: 'Battery backup diagnostics, load calculations & power conditioning', verified: true },
      { name: 'Windows Server Basics', detail: 'Active Directory accounts, group policies & network shares', verified: true },
    ],
  },
  {
    id: 'programming',
    name: 'Scripting & Automation',
    icon: 'icon-terminal',
    description: 'Scripting tools, automation routines, and programmatic problem solving.',
    items: [
      { name: 'Python', detail: 'Network automation scripts, socket programming & telemetry parsing', verified: true },
      { name: 'Bash / Shell Scripting', detail: 'Automating system maintenance, logs filtering & backup tasks', verified: true },
      { name: 'JavaScript & TypeScript', detail: 'Building robust interactive web applications & utilities', verified: true },
      { name: 'C# & C++', detail: 'Object-oriented programming, data structures & memory basics', verified: true },
      { name: 'PHP & SQL', detail: 'Relational database schema queries & server-side scripts', verified: true },
    ],
  },
  {
    id: 'web',
    name: 'Web & Development Tooling',
    icon: 'icon-book-open',
    description: 'Modern development platforms, version control, and production builds.',
    items: [
      { name: 'Astro 5', detail: 'High-performance static site architecture & zero-JS defaults', verified: true },
      { name: 'HTML5 & Modern CSS', detail: 'Semantic structure, CSS custom properties & fluid layouts', verified: true },
      { name: 'Git & GitHub', detail: 'Branching strategies, commit hygiene & GitHub Actions CI/CD', verified: true },
      { name: 'Keystatic CMS', detail: 'Git-backed schema design for headless content platforms', verified: true },
    ],
  },
] as const;

export interface LabNote {
  id: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  codeSnippet?: string;
  codeLang?: string;
  content: string;
}

export const labNotes: readonly LabNote[] = [
  {
    id: 'vlan-segmentation-field-note',
    number: 'NOTE-01',
    title: 'VLAN Segmentation & 802.1Q Trunking in Small Enterprise Deployments',
    category: 'Networking',
    readTime: '4 min read',
    date: 'October 2026',
    summary:
      'A practical breakdown of broadcast domain isolation, native VLAN security risks, and configuring Router-on-a-Stick vs Layer 3 switched routing.',
    codeLang: 'bash',
    codeSnippet: `# Configuring 802.1Q sub-interface on a Cisco router
Router(config)# interface GigabitEthernet0/0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# description MANAGEMENT_VLAN

Router(config)# interface GigabitEthernet0/0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# description WORKSTATIONS_VLAN`,
    content:
      'In flat networks, a single broadcast storm or compromised workstation can flood every port on a physical switch. Segmenting traffic into VLANs (Virtual Local Area Networks) divides a single physical switch into isolated logical broadcast domains. By defining 802.1Q trunking on interconnect uplinks, multiple VLAN tags travel across a single physical cable while preserving strict boundary isolation. In our lab configurations, inter-VLAN routing is either handed off to sub-interfaces on a router or handled internally by Layer 3 switch virtual interfaces (SVIs), enforcing ACLs at the boundary.',
  },
  {
    id: 'firewall-ruleset-first-principles',
    number: 'NOTE-02',
    title: 'First Principles of Stateful Edge Firewalls: Lessons from Internship',
    category: 'Cybersecurity',
    readTime: '5 min read',
    date: 'September 2026',
    summary:
      'Why rule order and state tables are foundational. Moving from default-allow misconfigurations to a hardened default-deny posture.',
    codeLang: 'text',
    codeSnippet: `[PACKET INGESTION]
       │
       ▼
Is packet part of an ESTABLISHED/RELATED connection?
       ├── YES ──► [ALLOW PACKET] (Bypass heavy inspection)
       └── NO  ──► [EVALUATE ACL RULES IN STRICT ORDER]
                     ├── Rule 1: Allow DNS (Port 53 UDP) to authorized resolvers
                     ├── Rule 2: Allow HTTPS (Port 443 TCP) outbound
                     ├── Rule 3: Block all incoming unsolicited WAN packets
                     └── Rule 999: EXPLICIT DEFAULT DROP & LOG`,
    content:
      'Unlike stateless packet filters that examine each packet in total isolation, stateful firewalls track the state of active network connections in memory. Once an internal host initiates a TCP handshake to a remote web server, the return SYN-ACK packet is permitted automatically because the connection table records the sequence number and port pair. At Powernet, reviewing firewall policies reinforced the cardinal rule of network security: place the most specific and restrictive rules at the top, permit established return traffic, and always terminate with an explicit default-deny drop rule.',
  },
  {
    id: 'single-file-browser-tools',
    number: 'NOTE-03',
    title: 'Why Zero-Dependency Client Tools Win for Field Service Work',
    category: 'Systems & Web',
    readTime: '3 min read',
    date: 'August 2026',
    summary:
      'Architecting the Service Document Compiler to execute 100% in the client browser. Zero server attack surface, no runtime dependencies, and true offline resilience.',
    codeLang: 'javascript',
    codeSnippet: `// Pure client-side canvas rendering to high-res A4 JPEG
function exportA4Document(canvas, quality = 0.92) {
  // 300 DPI A4 standard: 2480 x 3508 pixels
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = \`service-report-\${Date.now()}.jpg\`;
    link.click();
    URL.revokeObjectURL(url);
  }, 'image/jpeg', quality);
}`,
    content:
      'When field technicians visit customer sites with unstable or non-existent internet, cloud-dependent SaaS portals fail. When building the Service Document Compiler, I chose a zero-dependency architecture consisting of static HTML, CSS, and Vanilla JavaScript. By utilizing the browser native Canvas API to render form records directly into an A4 aspect ratio, technicians can fill out checklists, sign off on repaired hardware, and save printable documents entirely offline. There are zero servers to breach, zero API keys to manage, and zero hosting costs.',
  },
  {
    id: 'linux-network-diagnostics-checklist',
    number: 'NOTE-04',
    title: 'Field Technician Checklist: Linux Network Diagnostics Beyond Ping',
    category: 'Linux / Systems',
    readTime: '4 min read',
    date: 'July 2026',
    summary:
      'A practical reference for investigating socket states, MTU mismatches, and DNS resolution latency on production Linux machines.',
    codeLang: 'bash',
    codeSnippet: `# 1. Inspect all listening TCP & UDP sockets with process names
ss -tulpn

# 2. Verify routing table and default gateway metric
ip route show

# 3. Live packet inspection filtered to DNS & HTTP traffic on eth0
sudo tcpdump -nn -i eth0 port 53 or port 443

# 4. Trace packet path with hop-by-hop latency and packet loss
mtr --report-wide -c 10 1.1.1.1`,
    content:
      'When network connectivity fails, relying solely on ping often yields false confidence. A host might respond to ICMP Echo requests while dropping TCP packets due to mismatched MTU sizes or restrictive firewall tables. Modern Linux distributions deprecate netstat in favor of ss and iproute2. Command tools like "ss -tulpn" immediately expose which daemon has bound a socket, while "mtr" pinpoints exactly which intermediate routing hop introduces packet jitter or latency spikes.',
  },
] as const;

export interface TopologyNode {
  id: string;
  label: string;
  type: 'gateway' | 'switch' | 'server' | 'endpoint' | 'security' | 'power';
  ip: string;
  zone: string;
  status: string;
  latency: string;
  x: number;
  y: number;
  z: number;
  description: string;
  ports: string;
}

export const topologyNodes: readonly TopologyNode[] = [
  {
    id: 'edge-gw',
    label: 'Edge Gateway / Firewall',
    type: 'security',
    ip: '192.168.1.1',
    zone: 'Perimeter / WAN',
    status: 'ACTIVE · SPI ON',
    latency: '1.2ms',
    x: 0,
    y: -110,
    z: 20,
    description: 'Hardware edge firewall executing stateful inspection, port address translation (PAT), and inbound DDoS protection.',
    ports: 'WAN: SFP+ 1G · LAN: GE0/1',
  },
  {
    id: 'core-sw',
    label: 'Core Switch (VLAN Trunk)',
    type: 'switch',
    ip: '192.168.1.2',
    zone: 'Distribution Layer',
    status: 'ACTIVE · 802.1Q',
    latency: '0.4ms',
    x: -90,
    y: -20,
    z: -10,
    description: 'Managed 24-port switch managing 802.1Q trunking, STP loop avoidance, and segmenting traffic between Management, Staff, and Lab.',
    ports: 'Trunk: GE0/24 · Ports 1-23 Active',
  },
  {
    id: 'linux-srv',
    label: 'Debian Host / Syslog',
    type: 'server',
    ip: '192.168.10.15',
    zone: 'VLAN 10 · Systems',
    status: 'ONLINE · SSH HARDENED',
    latency: '0.8ms',
    x: 100,
    y: -20,
    z: -15,
    description: 'Dedicated Linux server running automated log aggregation, network monitoring scripts, and automated backup routines.',
    ports: 'Port 22 (SSH Keyed), Port 514 (Syslog)',
  },
  {
    id: 'tech-ws',
    label: 'IT Support Workstation',
    type: 'endpoint',
    ip: '192.168.20.44',
    zone: 'VLAN 20 · Workstations',
    status: 'CONNECTED',
    latency: '0.3ms',
    x: -120,
    y: 80,
    z: 15,
    description: 'Workstation running network diagnostics, Packet Tracer simulations, WireShark captures, and technical documentation.',
    ports: 'GE0/4 · 1000BASE-T Full Duplex',
  },
  {
    id: 'ups-power',
    label: 'Rack UPS Telemetry',
    type: 'power',
    ip: '192.168.10.2',
    zone: 'Infrastructure',
    status: 'ONLINE · 100% LOAD OK',
    latency: '1.8ms',
    x: 0,
    y: 80,
    z: 25,
    description: 'Smart-UPS power conditioning module with SNMP card monitoring input voltage, battery load capacity, and thermal sensors.',
    ports: 'NMC SNMP v3 · Pure Sine Wave',
  },
  {
    id: 'dns-resolver',
    label: 'DNS & Gateway Uplink',
    type: 'gateway',
    ip: '1.1.1.1 / 8.8.8.8',
    zone: 'External Uplink',
    status: 'RESOLVING',
    latency: '18ms',
    x: 120,
    y: 80,
    z: 5,
    description: 'Encrypted DNS over TLS upstream resolver providing fast recursive lookups and domain reputation filtering.',
    ports: 'Port 853 / Port 53 UDP/TCP',
  },
] as const;

export const contacts = [
  {
    channel: 'Email',
    label: 'vkisath2@gmail.com',
    href: 'mailto:vkisath2@gmail.com',
    icon: 'icon-social-mail' as IconName,
    external: false,
    detail: 'Direct inquiries & opportunities',
  },
  {
    channel: 'GitHub',
    label: '@Vinuga530',
    href: 'https://github.com/Vinuga530',
    icon: 'icon-social-github' as IconName,
    external: true,
    detail: 'Code repositories & open source',
  },
  {
    channel: 'LinkedIn',
    label: 'linkedin.com/in/vinugakisath',
    href: 'https://www.linkedin.com/in/vinugakisath/',
    icon: 'icon-social-linkedin' as IconName,
    external: true,
    detail: 'Professional network & experience',
  },
] as const;
