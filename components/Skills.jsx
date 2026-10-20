import { FaHtml5, FaCss3Alt, FaGitAlt, FaGithub } from 'react-icons/fa';
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiGraphql,
  SiApollographql,
  SiMongodb,
  SiJsonwebtokens,
  SiRabbitmq,
  SiNginx,
} from 'react-icons/si';

// Simple text mark for tools that have no official logo in the icon set
const Monogram = ({ letter }) => (
  <span className="font-mono text-2xl font-semibold leading-none">{letter}</span>
);

// `color` is the brand colour shown on hover (near-black brands use light grey so they stay visible)
const skills = [
  { name: 'javascript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'python', icon: SiPython, color: '#4B8BBE' },
  { name: 'html', icon: FaHtml5, color: '#E34F26' },
  { name: 'css', icon: FaCss3Alt, color: '#1E90E0' },
  { name: 'react.js', icon: SiReact, color: '#61DAFB' },
  { name: 'next.js', icon: SiNextdotjs, color: '#E4E4E7' },
  { name: 'tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'express.js', icon: SiExpress, color: '#E4E4E7' },
  { name: 'flask', icon: SiFlask, color: '#E4E4E7' },
  { name: 'graphql', icon: SiGraphql, color: '#E10098' },
  { name: 'apollo', icon: SiApollographql, color: '#E4E4E7' },
  { name: 'mongodb', icon: SiMongodb, color: '#47A248' },
  { name: 'jwt', icon: SiJsonwebtokens, color: '#D63AFF' },
  { name: 'rabbitmq', icon: SiRabbitmq, color: '#FF6600' },
  { name: 'nginx', icon: SiNginx, color: '#009639' },
  { name: 'nameko', icon: () => <Monogram letter="N" />, color: '#34D399' },
  { name: 'nodeshift', icon: () => <Monogram letter="NS" />, color: '#34D399' },
  { name: 'git', icon: FaGitAlt, color: '#F05032' },
  { name: 'github', icon: FaGithub, color: '#E4E4E7' },
];

export default function Skills() {
  return (
    <section id="skills" className="py-10 border-b border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
        technologies
      </h2>

      <div className="grid justify-between grid-cols-3 sm:grid-cols-4 gap-3 md:grid-cols-[repeat(5,72px)] md:gap-2 lg:grid-cols-[repeat(10,72px)]">
        {skills.map(({ name, icon: Icon, color }) => (
          <div
            key={name}
            style={{ '--brand': color }}
            className="group aspect-square flex flex-col items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-2 transition-colors hover:border-zinc-600 md:aspect-auto md:h-[72px] md:w-[72px] md:gap-1.5 md:p-1 md:rounded-md"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center text-3xl text-zinc-500 transition-colors group-hover:text-[color:var(--brand)]"
            >
              <Icon />
            </span>
            <span className="text-[11px] font-mono text-zinc-400 text-center leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}