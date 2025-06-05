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
};

export default Product;
