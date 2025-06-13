import { ProductEditContainer } from '@/components/products';
import { useParams } from 'react-router-dom';

/**
 * Renders "ProductEdit" view
 * url: /admin/products/:id/edit
 * @page ProductEdit
 */
const ProductEditView = () => {
  const { id } = useParams<{ id: string }>();

  return <ProductEditContainer productId={id!} />;
};

export default ProductEditView;
