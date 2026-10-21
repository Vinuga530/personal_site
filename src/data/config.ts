import type { IconName } from './icons';

export const site = {
  title: 'Vinuga Kisath — Cybersecurity and Network Security Student',
  description: 'Vinuga Kisath is a Sri Lankan student in Network Technology and Cyber Security and an IT intern at Powernet, working on networking, firewalls and Linux.',
  url: 'https://www.vinugakisath.site/',
} as const;

export const ports = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export const projects = [
  { title: 'Powernet company website', meta: 'Astro · Keystatic · GitHub', href: undefined,
    text: 'The website for Powernet (Pvt) Ltd, built with Astro and Keystatic, with a separate test deployment for checking changes before they go live.' },
  { title: 'Service Document Compiler', meta: 'HTML · CSS · JavaScript', href: undefined,
    text: 'A single-file HTML tool that exports service documents as A4 JPG images, with no install and no server.' },
  { title: 'This portfolio', meta: 'Astro · TypeScript · Vercel', href: 'https://github.com/Vinuga530/personal_site',
    text: 'A static site built around a patch-panel idea: each section is a port, and its LED lights as you scroll to it.' },
  { title: 'IT department ticketing system', meta: 'Concept', href: undefined,
    text: 'A concept for a ticketing system that moves IT requests off the phone, to cut down a high call volume.' },
] as const;

// TODO: confirm which tasks were done personally vs assisted, and add the internship start date.
export const experience = {
  role: 'IT intern', org: 'Powernet (Pvt) Ltd',
  text: 'Hands-on exposure to IT support, networking, enterprise infrastructure, firewall configuration, power protection (UPS) systems and technical documentation, working alongside the team on technology solutions for clients.',
} as const;

export const education = [
  { key: 'Studying', value: 'Higher Diploma in Network Technology and Cyber Security, ICBT Campus in collaboration with Cardiff Metropolitan University' },
  { key: 'In progress', value: 'CCNA (no certification earned yet)' },
] as const;

export const skills = [
  { key: 'Networking and security', value: 'Routing, switching, firewall administration, network security (studied, with workplace exposure)' },
  { key: 'Systems', value: 'Linux, terminal tools' },
  { key: 'Programming', value: 'Python, C#, C++, PHP, JavaScript' },
  { key: 'Web', value: 'HTML, CSS, JavaScript, Astro, GitHub' },
] as const;

export const focus = {
  updated: 'October 2026',
  items: ['Network security', 'Firewall administration', 'Linux', 'Python', 'Networking fundamentals', 'Practical security labs'],
} as const;

export const contacts: readonly { channel: string; label: string; href: string; icon: IconName; external: boolean }[] = [
  { channel: 'Email', label: 'vkisath2@gmail.com', href: 'mailto:vkisath2@gmail.com', icon: 'icon-social-mail', external: false },
  { channel: 'GitHub', label: '@Vinuga530', href: 'https://github.com/Vinuga530', icon: 'icon-social-github', external: true },
  { channel: 'LinkedIn', label: 'linkedin.com/in/vinugakisath', href: 'https://www.linkedin.com/in/vinugakisath/', icon: 'icon-social-linkedin', external: true },
];
