import { CategoryPage } from '@/components/category-page';
import { CATEGORIES_DATA } from '@/lib/data';

export default function AppsPage() {
  return <CategoryPage type="app" categories={CATEGORIES_DATA} />;
}
