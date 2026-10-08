const links = [
  { href: 'https://linkedin.com/', label: 'LinkedIn', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
  ) },
  { href: 'https://orcid.org/', label: 'ORCID', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">ORCID</text></svg>
  ) },
  { href: 'https://www.researchgate.net/', label: 'ResearchGate', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.6 17.6h-2.1l-1.7-2.7h-2.1v2.7h-1.8v-10.2h4.2c2.1 0 3.3 1.2 3.3 2.9 0 1.2-.7 2.1-1.8 2.5l2 2.9zm-3.8-4.2c1 0 1.5-.5 1.5-1.3s-.5-1.3-1.5-1.3h-2.1v2.6zm-7.8-7.4c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3zm1.3 2.1c-1.2 0-2.1.9-2.1 2.1s.9 2.1 2.1 2.1 2.1-.9 2.1-2.1-.9-2.1-2.1-2.1zm0 3.2c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm13.2 7.2c0 .7-.6 1.3-1.3 1.3s-1.3-.6-1.3-1.3.6-1.3 1.3-1.3 1.3.6 1.3 1.3zm-1.3-2.1c1.2 0 2.1.9 2.1 2.1s-.9 2.1-2.1 2.1-2.1-.9-2.1-2.1.9-2.1 2.1-2.1zm0 3.2c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1-1.1.5-1.1 1.1.5 1.1 1.1 1.1z"/></svg>
  ) },
  { href: 'mailto:your.email@gmail.com', label: 'Gmail', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20V8.99l8 7 8-7V20H4z"/></svg>
  ) },
  { href: 'https://github.com/', label: 'GitHub', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>
  ) },
  // Add more essential links as needed
];

export default function QuickLinks() {
  return (
    <div className="flex gap-4 justify-center mt-4">
      {links.map(link => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="hover:text-moss transition">
          {link.icon}
        </a>
      ))}
    </div>
  );
} 