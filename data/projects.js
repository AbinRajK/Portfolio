export const projectsData = [
  {
    id: 'project-1',
    title: 'MedExpiry. - Medicine Inventory Management App',
    description:
      'medicine management pwa for pharmacies and individuals to track and replace expired medicines with real-time updates. includes secure jwt login, signup and password recovery, with a flask, nameko and rabbitmq backend on mongodb, deployed on nodeshift behind nginx.',
    github: 'https://github.com/yourusername/medexpiry',
    live: 'https://www.medexpiry.com',
    tags: ['next.js', 'react', 'pwa', 'jwt', 'flask', 'rabbitmq', 'mongodb', 'nginx'],
  },
  {
    id: 'project-2',
    title: 'Magella - Mini Project Management System',
    description:
      'A small real-time kanban board where drag-and-drop changes sync instantly to everyone on a shared board over websockets. microservices backend (gateway, auth, board, realtime) on mongodb, with redis for events and presence, containerised with docker and deployed to kubernetes by a github actions pipeline.',
    github: 'https://github.com/AbinRajK/taskboard',
    live: null,
    tags: ['next.js', 'node.js', 'socket.io', 'redis', 'mongodb', 'docker', 'kubernetes', 'github actions'],
  },
];