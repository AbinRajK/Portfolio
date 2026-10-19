import { projectsData } from '@/data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-10 border-b border-zinc-800">
      <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        Projects
      </h2>

      <div className="space-y-8">
        {projectsData.map((project) => (
          <div key={project.id} className="group">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 mb-1">
              <h3 className="min-w-0 text-lg text-zinc-200 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>

              <div className="flex shrink-0 gap-3 whitespace-nowrap text-xs font-mono text-zinc-500">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-zinc-300">
                    code
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-zinc-300">
                    live ↗
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
              {project.description}
            </p>

            <p className="text-[11px] font-mono text-zinc-600 leading-relaxed">
              {project.tags.join(' / ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}