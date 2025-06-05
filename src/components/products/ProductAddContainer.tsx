import { AppView } from '@/components';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductAddForm } from './components';
import { artworkService } from '@/services';

const ProductAddContainer = () => {
  const navigate = useNavigate();

  const handleAddProduct = async (payload: any) => {
    try {
      await artworkService.createArtwork(payload);
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Tạo sản phẩm thất bại, vui lòng thử lại');
    }
  };

  return (
    <AppView>
      <Typography variant="h4" gutterBottom>
        Thêm sản phẩm mới
      </Typography>

      <ProductAddForm onSubmit={handleAddProduct} />
    </AppView>
  );
};

export default ProductAddContainer;
