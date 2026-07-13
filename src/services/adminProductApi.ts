import { api } from './api';
import { ApiEnvelope } from '@/types/auth.types';
import { Product } from '@/types/product.types';

export interface CreateProductInput {
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  sku: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  images: FileList;
}

export const adminProductApi = {
  create: async (input: CreateProductInput) => {
    const formData = new FormData();
    formData.append('title', input.title);
    formData.append('description', input.description);
    formData.append('brand', input.brand);
    formData.append('category', input.category);
    formData.append('price', String(input.price));
    formData.append('discount', String(input.discount ?? 0));
    formData.append('stock', String(input.stock));
    formData.append('sku', input.sku);
    formData.append('featured', String(input.featured ?? false));
    formData.append('bestseller', String(input.bestseller ?? false));
    formData.append('newArrival', String(input.newArrival ?? false));
    Array.from(input.images).forEach((file) => formData.append('images', file));

    const { data } = await api.post<ApiEnvelope<Product>>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data as Product;
  },
};
