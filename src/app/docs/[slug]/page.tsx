import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FeaturePage } from "@/components/feature-page";
import { getFeature } from "@/lib/content";
import { allSlugs } from "@/lib/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);

  if (!feature) {
    return { title: "Not Found" };
  }

  return {
    title: `${feature.title} | Next.js Features`,
    description: feature.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const feature = getFeature(slug);

  if (!feature) {
    notFound();
  }

  return <FeaturePage feature={feature} />;
}
