import { api } from './api';
import { ApiEnvelope } from '@/types/auth.types';
import { Product, Category, ProductQueryParams, PaginationMeta } from '@/types/product.types';

const toQueryString = (params: ProductQueryParams): string => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });
  return search.toString();
};

export const productApi = {
  list: async (params: ProductQueryParams) => {
    const { data } = await api.get<ApiEnvelope<Product[]> & { meta?: { pagination: PaginationMeta } }>(
      `/products?${toQueryString(params)}`
    );
    return { items: data.data ?? [], pagination: data.meta?.pagination };
  },
  getBySlug: async (slug: string) => {
    const { data } = await api.get<ApiEnvelope<Product>>(`/products/slug/${slug}`);
    return data.data as Product;
  },
  getRelated: async (slug: string) => {
    const { data } = await api.get<ApiEnvelope<Product[]>>(`/products/slug/${slug}/related`);
    return data.data ?? [];
  },
};

export const categoryApi = {
  list: async () => {
    const { data } = await api.get<ApiEnvelope<Category[]>>('/categories');
    return data.data ?? [];
  },
  create: async (input: { name: string; description?: string }) => {
    const { data } = await api.post<ApiEnvelope<Category>>('/categories', input);
    return data.data as Category;
  },
};
