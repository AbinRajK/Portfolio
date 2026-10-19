'use client';

import { useEffect, useRef } from 'react';
import { Chakra_Petch } from 'next/font/google';

const chakraPetch = Chakra_Petch({
  weight: ['400', '300'],
  subsets: ['latin'],
});

const roles = ['Full-Stack Developer', 'Next.js specialist', 'React.js Developer', 'MERN Stack Developer'];

// Tweak these to taste
const TYPE_SPEED = 15;          // characters per second while typing
const DELETE_SPEED = 15;        // characters per second while deleting
const HOLD_AFTER_TYPE = 1400;   // ms pause on a fully typed role
const HOLD_AFTER_DELETE = 350;  // ms pause on empty before next role
const GLITCH_LENGTH = 3;        // how many characters trailing the caret are glitching
const GLITCH_FPS = 60;          // how fast the glitch flickers (independent of screen fps)

const GLITCH_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789#%&*+<>/';

// Vertical dotted rectangle, drawn with CSS so it is exactly 1ch wide (no layout shift)
const DOT_BLOCK =
  '<span style="display:inline-block;width:1ch;height:1.05em;vertical-align:-0.14em;' +
  'background-image:radial-gradient(currentColor 0.9px,transparent 1.2px);' +
  'background-size:3px 3px;color:#34d399;"></span>';

const glitchLetter = () => {
  const c = GLITCH_CHARS[(Math.random() * GLITCH_CHARS.length) | 0];
  const dy = Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;
  return (
    `<span style="display:inline-block;color:#34d399;transform:translateY(${dy}px);` +
    `text-shadow:1px 0 #22d3ee,-1px 0 #f472b6;">${c}</span>`
  );
};

const escapeChar = (c) => (c === '<' ? '&lt;' : c === '&' ? '&amp;' : c);

export default function Hero() {
  const textRef = useRef(null);
  const caretRef = useRef(null);

  useEffect(() => {
    const textEl = textRef.current;
    const caretEl = caretRef.current;
    if (!textEl || !caretEl) return;

    // Respect reduced-motion: show the first role statically
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      textEl.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let progress = 0;      // fractional number of revealed characters
    let phase = 'typing';  // 'typing' | 'holdFull' | 'deleting' | 'holdEmpty'
    let holdUntil = 0;
    let last = performance.now();
    let lastKey = '';
    let raf;

    const setBlink = (on) => caretEl.classList.toggle('animate-blink', on);

    // Builds the visible string; trailing characters are glitched while typing
    const render = (glitching) => {
      const role = roles[roleIndex];
      const visible = Math.floor(progress);
      let html = '';

      for (let i = 0; i < visible; i++) {
        const age = progress - i; // how many chars ago this one appeared
        if (glitching && age < GLITCH_LENGTH && role[i] !== ' ') {
          if (age < 1) {
            html += DOT_BLOCK;                                  // just born: dotted rectangle
          } else if (age < 2) {
            html += Math.random() < 0.5 ? DOT_BLOCK : glitchLetter(); // unstable
          } else {
            html += Math.random() < 0.25 ? DOT_BLOCK : glitchLetter(); // almost settled
          }
        } else {
          html += escapeChar(role[i]);
        }
      }
      return html;
    };

    const tick = (now) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      const role = roles[roleIndex];

      if (phase === 'typing') {
        progress += TYPE_SPEED * dt;
        if (progress >= role.length + GLITCH_LENGTH) {
          // let the last characters finish glitching before the hold
          progress = role.length + GLITCH_LENGTH;
        }
        if (progress >= role.length + GLITCH_LENGTH) {
          phase = 'holdFull';
          holdUntil = now + HOLD_AFTER_TYPE;
          setBlink(true);
        }
      } else if (phase === 'holdFull') {
        if (now >= holdUntil) {
          phase = 'deleting';
          progress = role.length;
          setBlink(false);
        }
      } else if (phase === 'deleting') {
        progress -= DELETE_SPEED * dt;
        if (progress <= 0) {
          progress = 0;
          phase = 'holdEmpty';
          holdUntil = now + HOLD_AFTER_DELETE;
          roleIndex = (roleIndex + 1) % roles.length;
          setBlink(true);
        }
      } else if (phase === 'holdEmpty') {
        if (now >= holdUntil) {
          phase = 'typing';
          setBlink(false);
        }
      }

      // Only touch the DOM when something actually changed
      const glitching = phase === 'typing' || phase === 'holdFull';
      const clamped = Math.min(progress, roles[roleIndex].length);
      const bucket = Math.floor((now / 1000) * GLITCH_FPS);
      const key = `${roleIndex}|${Math.floor(clamped)}|${glitching ? bucket : 'x'}|${phase}`;

      if (key !== lastKey) {
        lastKey = key;
        const saved = progress;
        // Characters beyond the role length are "virtual" age for the glitch tail
        progress = clamped;
        const html = glitching ? renderWithTail(saved) : render(false);
        progress = saved;
        textEl.innerHTML = html;
      }

      raf = requestAnimationFrame(tick);
    };

    // Same as render(true) but uses the unclamped progress for glitch age,
    // so the final letters keep glitching for a moment after fully typed
    const renderWithTail = (rawProgress) => {
      const role = roles[roleIndex];
      const visible = Math.min(Math.floor(rawProgress), role.length);
      let html = '';
      for (let i = 0; i < visible; i++) {
        const age = rawProgress - i;
        if (age < GLITCH_LENGTH && role[i] !== ' ') {
          if (age < 1) html += DOT_BLOCK;
          else if (age < 2) html += Math.random() < 0.5 ? DOT_BLOCK : glitchLetter();
          else html += Math.random() < 0.25 ? DOT_BLOCK : glitchLetter();
        } else {
          html += escapeChar(role[i]);
        }
      }
      return html;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="pt-12 pb-10 border-b border-zinc-800">
      <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
        available for work
      </span>

      <h1 className={`${chakraPetch.className} text-6xl sm:text-5xl font-semibold text-zinc-100 mt-2 tracking-tight`}>
        Abin Raj K
      </h1>

      <div className="h-8 flex items-center font-mono text-sm text-zinc-400 my-1">
        <span className="sr-only">{roles.join(', ')}</span>
        <span aria-hidden="true" className="flex items-center">
          <span className="text-zinc-600 mr-2">&gt;</span>
          <span ref={textRef} className="inline-block whitespace-pre" />
          <span ref={caretRef} className="w-0.5 h-4 bg-emerald-400 ml-1 inline-block" />
        </span>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        MERN stack developer building scalable, user-centric web apps with next.js, node.js and
        mongodb. shipped medexpiry, a medicine management PWA, from frontend to deployment.
      </p>

      <div className="flex flex-wrap gap-5 text-xs font-mono text-zinc-400">
        <a href="#contact" className="hover:text-zinc-100 transition-colors">
          [contact me]
        </a>
        <a href="/htmlCode-1.pdf" target="_blank" className="hover:text-zinc-100 transition-colors">
          [get resume]
        </a>
        <a href="https://github.com/AbinRajK" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">
          [github link]
        </a>
        <a href="https://www.linkedin.com/in/abin-raj-k-714412144" target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">
          [linkedin page]
        </a>
      </div>
    </section>
  );
}