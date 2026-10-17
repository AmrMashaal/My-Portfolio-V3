/**
 * Single source of truth for portfolio content.
 * Items marked TODO are drafts or placeholders to be replaced with verified details.
 */

export const profile = {
  name: 'Amr Mashaal',
  role: 'Full-stack developer',
  location: 'Egypt',
  email: 'amrhossammashal@gmail.com',
  github: 'https://github.com/amrmashaal',
  linkedin: 'https://www.linkedin.com/in/amr-h-mashaal',
  /** Drop the real portrait at public/amr-portrait.png (transparent PNG works best). */
  portrait: '/amr-portrait.png',
} as const

export const navLinks = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export type Project = {
  index: string
  name: string
  kind: string
  summary: string
  purpose: string
  stack: string[]
  /** Set when a verified live URL exists. */
  live?: string
  /** Set when a verified repository URL exists. */
  repo?: string
  /** Set when a real screenshot exists in /public/projects. */
  image?: string
}

/**
 * TODO: Descriptions are drafts inferred from project names.
 * Replace with accurate copy and add `live`, `repo` and `image` once verified.
 */
export const projects: Project[] = [
  {
    index: '01',
    name: 'NewTube',
    kind: 'Video platform',
    summary: 'A video-sharing web app in the spirit of the platforms we all use daily.',
    purpose:
      'Built to practise the full path of a media product: uploading, listing and watching content, backed by an API and a database.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  },
  {
    index: '02',
    name: 'Loop',
    kind: 'Web application',
    summary: 'A web application built end to end, from interface to data layer.',
    purpose:
      'A practical product exercise in structuring a maintainable React front end against a Node.js backend.',
    stack: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
  },
  {
    index: '03',
    name: 'Hangman',
    kind: 'Browser game',
    summary: 'The classic word-guessing game, rebuilt for the browser.',
    purpose:
      'A focused exercise in state management and clean UI logic: letters, guesses, win and lose conditions.',
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
]

export type SkillGroup = { label: string; note: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    note: 'Interfaces that stay readable as they grow.',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
  },
  {
    label: 'Styling & UI',
    note: 'Design systems over one-off styles.',
    items: ['Sass', 'Tailwind CSS', 'Material UI', 'shadcn/ui'],
  },
  {
    label: 'Backend',
    note: 'APIs with clear boundaries.',
    items: ['Node.js', 'Express'],
  },
  {
    label: 'Data',
    note: 'Modelling before querying.',
    items: ['MongoDB', 'SQL'],
  },
  {
    label: 'Tools',
    note: 'Version control as a habit.',
    items: ['Git', 'GitHub'],
  },
]
