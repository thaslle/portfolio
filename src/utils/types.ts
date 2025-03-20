export type Collaborator = {
  name: string
  link: string
}

export type ProjectInfo = {
  year: string
  role: string
  stack: string
  collaborators: Collaborator[]
  live: string
}

export type Project = {
  title: string
  slug: string
  description: string
  video: string
  aspect: string
  info: ProjectInfo
}

export type Projects = Project[]
