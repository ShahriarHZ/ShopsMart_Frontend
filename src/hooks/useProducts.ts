import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { productApi, categoryApi } from '@/services/productApi';
import { ProductQueryParams } from '@/types/product.types';

export const useProducts = (params: Omit<ProductQueryParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['products', params],
    queryFn: ({ pageParam = 1 }) => productApi.list({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage ? lastPage.pagination.page + 1 : undefined,
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productApi.getBySlug(slug),
    enabled: !!slug,
  });
};

export const useRelatedProducts = (slug: string) => {
  return useQuery({
    queryKey: ['related-products', slug],
    queryFn: () => productApi.getRelated(slug),
    enabled: !!slug,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.list,
    staleTime: 5 * 60 * 1000,
  });
};
