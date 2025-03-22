export type Collaborator = {
  name: string
  link: string
}

export type Category = 'Work' | 'Craft'

export type ProjectInfo = {
  year: string
  role: string
  stack: string
  collaborators: Collaborator[]
  live: string
}

export type MediaType = 'video' | 'image'

export type MediaItem = {
  type: MediaType
  url: string
}

export type Line = {
  class: 'full' | 'equal-columns' // Adjust if more classes exist
  media: MediaItem[]
}

export type Project = {
  title: string
  slug: string
  category: Category
  description: string
  video: string
  aspect: string
  info: ProjectInfo
  lines?: Line[]
}

export type Projects = Project[]
