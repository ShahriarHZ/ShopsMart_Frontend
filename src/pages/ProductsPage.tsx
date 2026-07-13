import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-ratingsAverage', label: 'Top Rated' },
];

export const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('-createdAt');

  const { data: categories } = useCategories();
  const params = useMemo(() => ({ search, category, sort, limit: 12 }), [search, category, sort]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useProducts(params);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const products = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="bg-base-200 min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Shop All Products</h1>
          <p className="text-base-content/60 mt-1">Discover our curated collection, updated daily.</p>
        </div>

        <div className="card bg-base-100 border border-base-300 mb-8">
          <div className="card-body p-4 flex-row flex-wrap gap-3 items-center">
            <label className="input input-bordered flex items-center gap-2 flex-1 min-w-[200px]">
              <Search size={16} className="text-base-content/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="grow"
                placeholder="Search products..."
              />
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered"
            >
              <option value="">All categories</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <label className="select select-bordered flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-base-content/40" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="grow bg-transparent">
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-base-300 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-base-content/50 text-lg">No products found.</p>
            <p className="text-base-content/40 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div ref={sentinelRef} className="h-10" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-6">
            <span className="loading loading-dots loading-md text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};
