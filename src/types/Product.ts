import CategoryFilter from './CategoryFilter';

type Product = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  timestamp: number;
  code: string;
  categories: CategoryFilter[];
  width: number;
  height: number;
  medium: string;
  description: string;
  shortDescription: string;
  quantity: number;
};

export default Product;
