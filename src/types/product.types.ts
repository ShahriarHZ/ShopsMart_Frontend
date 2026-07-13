export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface ProductImage {
  url: string;
  publicId: string;
  alt?: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  category: Category | string;
  images: ProductImage[];
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  sku: string;
  ratingsAverage: number;
  ratingsCount: number;
  specifications: ProductSpecification[];
  colors: string[];
  sizes: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalResults: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  inStock?: boolean;
}
