import { artworkService } from '@/services';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ProductForm, { ProductFormInputs } from './components/ProductForm';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductAddContainer = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddProduct = async (data: ProductFormInputs) => {
    try {
      await artworkService.createArtwork(data);
      enqueueSnackbar('Thêm sản phẩm thành công!', { variant: 'success' });
      navigate('/admin/products');
    } catch (err: any) {
      console.error('Lỗi khi thêm sản phẩm:', err);

      if (err.response?.status === 409) {
        enqueueSnackbar('Tiêu đề sản phẩm đã tồn tại!', { variant: 'error' });
      } else {
        enqueueSnackbar('Thêm sản phẩm thất bại!', { variant: 'error' });
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 2 }}>
      <ProductForm onSubmit={handleAddProduct} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Box>
    </Box>
  );
};

export default ProductAddContainer;
