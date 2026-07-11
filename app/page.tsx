import { Sparkles, Zap, Star } from 'lucide-react';
import { HeroCarousel } from '@/components/hero-carousel';
import { HorizontalScroll } from '@/components/horizontal-scroll';
import {
  getFeaturedApps,
  getTrendingApps,
  getRecentApps,
  getRecommendedApps,
} from '@/lib/data';

export default function HomePage() {
  const featured = getFeaturedApps();
  const trending = getTrendingApps();
  const recent = getRecentApps();
  const recommended = getRecommendedApps();

  return (
    <div className="min-h-screen">
      <section className="container mx-auto max-w-7xl px-4 pt-6">
        <HeroCarousel items={featured} />
      </section>

      <div className="mt-10">
        <HorizontalScroll
          title="Lanzamientos Destacados"
          icon={<Zap className="w-5 h-5 text-primary" />}
          items={trending}
          viewAllHref="/games?sort=popular"
        />
      </div>

      <div className="mt-2">
        <HorizontalScroll
          title="Agregados Recientemente"
          icon={<Sparkles className="w-5 h-5 text-primary" />}
          items={recent}
          viewAllHref="/apps?sort=recent"
        />
      </div>

      <div className="mt-2">
        <HorizontalScroll
          title="Recomendadas para ti"
          icon={<Star className="w-5 h-5 text-primary" />}
          items={recommended}
          viewAllHref="/apps?sort=rating"
        />
      </div>

      <section className="container mx-auto max-w-7xl px-4 mt-12 mb-8">
        <div className="glass-card p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">12+</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Apps & Games
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">10</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Categories
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">100%</div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              SHA-256 Verified
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-text">
              24/7
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Community Support
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
