export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ProductsResponse = {
  data: Product[];
  pagination: Pagination;
};

export type User = {
  id: string;
  name: string;
  points: number;
};

export type CartItem = { product: Product; quantity: number };