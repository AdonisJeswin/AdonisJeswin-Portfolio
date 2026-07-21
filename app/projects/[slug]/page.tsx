import { projects } from "@/lib/projects";
import { generateProjectMetadata } from "@/lib/metadata";
import ProjectClientPage from "./ProjectClientPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

// Generate static routes for each slug at build time
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Build page-specific metadata dynamically
export function generateMetadata({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return generateProjectMetadata(project);
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  // Pick the next project in rotation for the bottom CTA teaser
  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <ProjectClientPage project={project} nextProject={nextProject} />;
}
