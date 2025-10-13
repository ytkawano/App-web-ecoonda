import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function ProductFilters({
  categories,
  activeCategory,
  setActiveCategory,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'default' : 'ghost'}
          onClick={() => setActiveCategory(category)}
          className={cn('wave-hover rounded-full px-6 capitalize')}
        >
          {category === 'All' ? 'Todos' : category}
        </Button>
      ))}
    </div>
  );
}
