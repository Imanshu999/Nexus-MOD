import { CategoryPage } from '@/components/category-page';
import { CATEGORIES_DATA } from '@/lib/data';

export default function GamesPage() {
  return <CategoryPage type="game" categories={CATEGORIES_DATA} />;
}
