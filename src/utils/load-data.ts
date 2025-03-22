import fs from 'fs'
import path from 'path'

import { Projects } from '@/utils/types'

export function loadProjects(): Projects {
  const filePath = path.join(process.cwd(), 'public', 'api', 'projects.json')

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const json = JSON.parse(fileContents)
    return json
  } catch (error) {
    console.error('Error reading JSON file:', error)
    return []
  }
}

export const loadProject = (slug: string) => {
  const data = loadProjects()

  const index = data.findIndex((project) => project.slug === slug)

  if (index === -1) return { project: null, prev: null, next: null }

  const project = data[index]
  const prev = data[index - 1] || data[data.length - 1]
  const next = data[index + 1] || data[0]

  return { project: project, prev: prev, next: next }
}
