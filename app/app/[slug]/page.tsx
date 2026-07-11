import { notFound } from 'next/navigation';
import { getAppBySlug, getRelatedApps } from '@/lib/queries';
import { AppDetailClient } from '@/components/app-detail-client';

export const revalidate = 300;

export default async function AppDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const app = await getAppBySlug(params.slug);

  if (!app) {
    notFound();
  }

  const related = await getRelatedApps(
    app.id,
    app.category_id,
    app.type,
    6
  );

  return <AppDetailClient app={app} related={related} />;
}

export async function generateStaticParams() {
  return [];
}
