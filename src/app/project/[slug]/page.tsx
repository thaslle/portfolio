//import { Metadata } from 'next'

import { ProjectView } from '@/components/project-view'
import { loadProjects, loadProject } from '@/utils/load-data'

// import { notFound } from "next/navigation";

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

// export async function generateMetadata(props: Params): Promise<Metadata> {
//   const params = await props.params;
//   const post = getPostBySlug(params.slug);

//   if (!post) {
//     return notFound();
//   }

//   const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

//   return {
//     title,
//     openGraph: {
//       title,
//       images: [post.ogImage.url],
//     },
//   };
// }

export async function generateStaticParams() {
  const projects = loadProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}
