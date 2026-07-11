import { notFound } from 'next/navigation';
import { getAppBySlug, getRelatedApps } from '@/lib/data';
import { AppDetailClient } from '@/components/app-detail-client';

export default function AppDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const app = getAppBySlug(params.slug);

  if (!app) {
    notFound();
  }

  const related = getRelatedApps(app, 6);

  return <AppDetailClient app={app} related={related} />;
}
