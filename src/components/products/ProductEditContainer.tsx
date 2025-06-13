import { useEffect, useState } from 'react';
import { artworkService } from '@/services';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import ProductForm, { ProductFormInputs } from './components/ProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ProductEditContainerProps = {
  productId: string;
};

const ProductEditContainer = ({ productId }: ProductEditContainerProps) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductFormInputs | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await artworkService.getArtwork(productId);

        setProduct({
          title: productData.title,
          description: productData.description,
          shortDescription: productData.shortDescription,
          medium: productData.medium,
          width: productData.width,
          height: productData.height,
          price: productData.price,
          quantity: productData.quantity,
          timestamp: productData.timestamp?.split('T')[0] || '',
          categoryIds: productData.categories?.map((cat: any) => cat.id) || [],
          imageUrl: productData.imageUrl,
        });
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
        enqueueSnackbar('Không thể tải sản phẩm!', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleUpdate = async (data: ProductFormInputs) => {
    try {
      const isFullUrl = data.imageUrl?.startsWith('http://') || data.imageUrl?.startsWith('https://');

      if (isFullUrl) {
        try {
          data.imageUrl = new URL(data.imageUrl).pathname;
          data.imageUrl = data.imageUrl.slice(1);
        } catch {
          console.warn('Invalid URL, giữ nguyên:', data.imageUrl);
        }
      }

      await artworkService.updateArtwork(productId, data);
      enqueueSnackbar('Cập nhật sản phẩm thành công!', { variant: 'success' });
      navigate('/admin/products');
    } catch (err) {
      console.error('Lỗi khi cập nhật sản phẩm:', err);
      if (err.response?.status === 409) {
        enqueueSnackbar('Tiêu đề sản phẩm đã tồn tại!', { variant: 'error' });
      } else {
        enqueueSnackbar('Cập nhật sản phẩm thất bại!', { variant: 'error' });
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        Không tìm thấy sản phẩm!
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 2 }}>
      <ProductForm defaultValues={product} onSubmit={handleUpdate} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </Box>
    </Box>
  );
};

export default ProductEditContainer;
