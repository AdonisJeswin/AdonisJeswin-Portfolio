import { Metadata } from "next";
import { Project } from "./projects";

export const siteConfig = {
  name: "Adonis Jeswin — Full-Stack Developer & UI/UX Designer",
  description: "Professional portfolio of Adonis Jeswin, a Full-Stack Developer & UI/UX Designer specializing in AI, Web3, Cybersecurity, and scalable software systems.",
  url: "https://yourportfolio.com",
  ogImage: "https://yourportfolio.com/og/home.png",
  links: {
    github: "https://github.com/AdonisJeswin",
    linkedin: "https://linkedin.com/in/adonis-jeswin",
    twitter: "https://twitter.com/adonis_jeswin",
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  const canonicalUrl = canonical || siteConfig.url;
  return {
    title,
    description,
    keywords: [
      "Adonis Jeswin",
      "Adonis Jeswin Portfolio",
      "Software Engineer",
      "Full-Stack Developer",
      "UI/UX Designer",
      "Artificial Intelligence",
      "Cybersecurity",
      "Next.js Developer Portfolio",
      "Solidity Web3 Developer",
      "Computer Science Engineer Mumbai",
      "SHAP explainability machine learning",
      "secure decentralized systems",
      "ethical hacking vulnerability scanning",
      "responsive custom 3D web design",
      "Next.js Tailwind CSS portfolio"
    ],
    authors: [
      {
        name: "Adonis Jeswin",
        url: siteConfig.url,
      },
    ],
    creator: "Adonis Jeswin",
    applicationName: "Adonis Jeswin Portfolio",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      title,
      description,
      siteName: title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@adonis_dev",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: new URL(siteConfig.url),
  };
}

export function generateProjectMetadata(project: Project): Metadata {
  return constructMetadata({
    title: `${project.title} — Case Study | Adonis`,
    description: project.summary,
    image: `https://yourportfolio.com/og/${project.slug}.png`,
    canonical: `${siteConfig.url}/projects/${project.slug}`,
  });
}
