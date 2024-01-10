export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}
