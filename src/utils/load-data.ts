// import fs from 'fs'
// import path from 'path'

import { Projects } from '@/utils/types'

export const loadProjects = async (): Promise<Projects> => {
  try {
    const res = await fetch('/api/projects.json')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const loadProject = async (slug: string) => {
  const data = await loadProjects()
  const project = data.find((page) => page.slug === slug)
}
