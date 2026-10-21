import type { IconName } from './icons';

export const site = {
  title: 'Vinuga K — Cybersecurity & Networking',
  description: 'Personal portfolio of Vinuga K — Cybersecurity and networking student, gamer, tinkerer.',
  url: 'https://www.vinugakisath.site/',
} as const;

export const ports = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const;

export const projects = [
  { title: 'Powernet company website', meta: 'Astro · Keystatic · GitHub',
    text: 'The website for Powernet (Pvt) Ltd, built with Astro and Keystatic, with a separate test deployment for checking changes before they go live.' },
  { title: 'Service Document Compiler', meta: 'HTML · CSS · JavaScript',
    text: 'A single-file HTML tool that exports service documents as A4 JPG images, with no install and no server.' },
  { title: 'IT department ticketing system', meta: 'Concept',
    text: 'A concept for a ticketing system that moves IT requests off the phone, to cut down a high call volume.' },
] as const;

export const stack = [
  { key: 'Languages', value: 'Python, C#, C++, PHP, JavaScript, HTML, CSS' },
  { key: 'Studying', value: 'CCNA, network technology, cyber security' },
] as const;

export const contacts: readonly { channel: string; label: string; href: string; icon: IconName; external: boolean }[] = [
  { channel: 'Email', label: 'vkisath2@gmail.com', href: 'mailto:vkisath2@gmail.com', icon: 'icon-social-mail', external: false },
  { channel: 'GitHub', label: '@Vinuga530', href: 'https://github.com/Vinuga530', icon: 'icon-social-github', external: true },
  { channel: 'LinkedIn', label: 'linkedin.com/in/vinugakisath', href: 'https://www.linkedin.com/in/vinugakisath/', icon: 'icon-social-linkedin', external: true },
];
