import { CategoryPage } from '@/components/category-page';
import { getCategories } from '@/lib/queries';

export const revalidate = 300;

export default async function AppsPage() {
  const categories = await getCategories();
  return <CategoryPage type="app" categories={categories} />;
}
