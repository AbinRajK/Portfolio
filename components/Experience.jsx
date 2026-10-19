const experience = [
  {
    id: 'exp-1',
    role: 'Junior Software Developer',
    company: 'Gofreelab Technologies',
    period: 'Feb.2024 - Feb.2026', // your resume text was cut off, so fill this in
    points: [
      'developed and deployed medexpiry, a medicine management pwa built with next.js and react that helps pharmacies and individuals track, manage and replace expired medicines with real-time updates.',
      'built a secure jwt authentication system with password recovery.',
      'built the backend with flask, nameko, rabbitmq and mongodb.',
      'deployed the application using nodeshift with an nginx web server.',
    ],
    tags: ['next.js', 'react', 'jwt', 'flask', 'nameko', 'rabbitmq', 'mongodb', 'nginx'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-10 border-b border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        WORK Experience
      </h2>

      <div className="space-y-8">
        {experience.map((job) => (
          <div key={job.id} className="group">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 mb-1">
              <h3 className="min-w-0  text-lg font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                {job.role}
              </h3>
              <span className="shrink-0 whitespace-nowrap text-xs font-mono text-zinc-500">
                {job.period}
              </span>
            </div>

            <p className="text-xs font-mono text-emerald-400 mb-3">{job.company}</p>

            <ul className="mb-3 space-y-1.5">
              {job.points.map((point, i) => (
                <li key={i} className="flex gap-2 text-xs text-zinc-400 leading-relaxed">
                  <span className="text-zinc-600 select-none">&gt;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-[11px] font-mono text-zinc-600 leading-relaxed">
              {job.tags.join(' / ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}