'use client';

import { useState, useEffect } from 'react';
import { Chakra_Petch } from 'next/font/google';

const chakraPetch = Chakra_Petch({
  weight: ['500', '600'],
  subsets: ['latin'],
});

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const Sun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(null); // null until mounted, avoids hydration mismatch

  // Read the theme the inline script in layout.js already applied
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }, []);

  // Sidebar: close on Escape, lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Close the sidebar if the window is resized up to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('light', next === 'light');
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };

  const themeLabel = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  const roundBtn =
    'flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100';

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-zinc-950/80 backdrop-blur border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center font-mono">
          <span className={`${chakraPetch.className} text-zinc-100 font-semibold text-base tracking-wide`}>
            Abin Raj K
          </span>

          {/* Desktop: words + round theme button */}
          <div className="hidden md:flex items-center gap-6 text-xs">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-zinc-400 transition-colors hover:text-zinc-100">
                {link.label}
              </a>
            ))}
            <button type="button" onClick={toggleTheme} aria-label={themeLabel} className={roundBtn}>
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-sidebar"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            <span className="flex flex-col gap-1" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </header>

      {/* Sidebar is a sibling of <header>, not a child: the header's backdrop-blur
          would otherwise trap a fixed element inside the header's box */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-55 bg-black/60 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        id="mobile-sidebar"
        className={`md:hidden fixed right-0 top-0 z-60 flex h-full w-64 flex-col border-l border-zinc-800 bg-zinc-950 px-6 py-3 font-mono text-sm transition-transform duration-200 ${
          open ? 'translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-zinc-500">menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav className="mt-8 flex flex-col">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-zinc-800 py-3 text-zinc-300 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-800 py-4">
          <span className="text-xs text-zinc-500">{theme === 'light' ? 'Light mode' : 'Dark mode'}</span>
          <button type="button" onClick={toggleTheme} aria-label={themeLabel} className={roundBtn}>
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
      </aside>
    </>
  );
}