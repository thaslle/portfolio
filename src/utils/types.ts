export type Collaborator = {
  name: string
  link: string
}

export type Category = 'Work' | 'Craft'

export type CategoryList = {
  title: Category
  description: string
  video: string
}

export type ProjectInfo = {
  year: string
  role: string
  stack: string
  collaborators: Collaborator[]
  live?: string
  label?: string
}

export type MediaType = 'video' | 'image'

export type MediaItem = {
  type: MediaType
  url: string
  aspect?: string
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
  tag: string
  media: MediaItem
  aspect: string
  info: ProjectInfo
  lines?: Line[]
}

export type Projects = Project[]
