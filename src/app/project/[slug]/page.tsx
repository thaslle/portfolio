import { ProjectView } from '@/components/project-view'
import { loadProjects, loadProject } from '@/utils/load-data'

export default async function Project(props: Params) {
  const params = await props.params
  const { project, prev, next } = loadProject(params.slug)

  if (!project?.info) return

  return <ProjectView project={project} prev={prev} next={next} />
}

type Params = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const projects = loadProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}
