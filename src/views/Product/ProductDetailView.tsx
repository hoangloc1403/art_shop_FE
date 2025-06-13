import { useState } from 'react';
import {
  Button,
  CardMedia,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Link,
  Container,
} from '@mui/material';
import { Facebook, Twitter, Pinterest, WhatsApp, Chat } from '@mui/icons-material';
import { ProductDetailDescriptionContainer, WallViewDialog, ZoomViewDialog } from './components';
import { Product } from '@/types';
import { artworkService, cartService } from '@/services';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getYearFromTimestamp } from '@/utils';
import { formatPrice } from '@/utils/format';
import { closeSnackbar, useSnackbar } from 'notistack';
import { useUserRoleFromToken } from '@/hooks';
import { SuggestedProductsByCategory } from '@/components/products/components';
import CustomArtworkRequest from '../Welcome/CustomArtworkRequest';

const ProductDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userRole = useUserRoleFromToken();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => artworkService.getArtwork(id),
    enabled: !!id,
  });

  const [openWallView, setOpenWallView] = useState(false);
  const [openZoomView, setOpenZoomView] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = async (isBuyNow: boolean) => {
    try {
      if (userRole !== 3)
        return enqueueSnackbar('Không thể thêm sản phẩm vào giỏ hàng.', {
          variant: 'warning',
          action: (key) => (
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                closeSnackbar(key);
                navigate('/sign_in');
              }}
            >
              Đăng nhập
            </Button>
          ),
        });

      if (product) {
        const updatedCart = await cartService.addToCart({
          artworkId: product.id,
          quantity: 1,
        });
        console.log('Added to cart:', updatedCart);

        if (isBuyNow) {
          navigate('/cart');
        }

        enqueueSnackbar('Sản phẩm đã được thêm vào giỏ hàng thành công!', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      enqueueSnackbar('Không thể thêm sản phẩm vào giỏ hàng.', { variant: 'error' });
    }
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <Box sx={{ backgroundColor: '#ffffff', mt: '64px', pt: '40px' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error" sx={{ textAlign: 'center', mt: 5 }}>
            {error?.message || 'Cannot load product details. Please try again.'}
          </Typography>
        ) : product ? (
          <>
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="stretch">
                {/* Product Image */}
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    height="550"
                    image={product.imageUrl || '/img/default-image.jpg'}
                    alt={product.title}
                    sx={{ objectFit: 'cover', borderRadius: '15px' }}
                  />
                  <Stack direction="row" spacing={2} sx={{ marginTop: '10px' }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #FF512F, #DD2476)',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        color: 'white',
                      }}
                      onClick={() => setOpenWallView(true)}
                    >
                      Xem trên tường
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #2B32B2, #1488CC)',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        color: 'white',
                      }}
                      onClick={() => setOpenZoomView(true)}
                    >
                      Phóng to
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ marginTop: '20px' }}>
                    <Facebook sx={{ color: '#3b5998', fontSize: '30px', cursor: 'pointer' }} />
                    <Twitter sx={{ color: '#1DA1F2', fontSize: '30px', cursor: 'pointer' }} />
                    <Pinterest sx={{ color: '#E60023', fontSize: '30px', cursor: 'pointer' }} />
                    {/* <LinkedIn sx={{ color: '#0077B5', fontSize: '30px', cursor: 'pointer' }} /> */}
                    <WhatsApp sx={{ color: '#25D366', fontSize: '30px', cursor: 'pointer' }} />
                    <Chat sx={{ color: '#0084FF', fontSize: '30px', cursor: 'pointer' }} />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={3} sx={{ padding: '20px' }} alignItems="center">
                    <Typography variant="h4" fontWeight="600" color="#333">
                      {product.title}
                    </Typography>
                    <Typography variant="h5" color="#d32f2f" fontWeight="bold">
                      {formatPrice(product.price)}
                    </Typography>
                    <Typography variant="body1" fontWeight="600" color="#555">
                      Chất liệu: {product.medium}
                    </Typography>
                    <Typography variant="body1" fontWeight="600" color="#555">
                      Kích thước: {`${product.width}cm x ${product.height}cm`}
                    </Typography>
                    <Typography variant="body1" fontWeight="600" color="#555">
                      Năm sáng tác: {getYearFromTimestamp(product.timestamp)}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        width: '50%',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
                        padding: '12px 0',
                        // borderRadius: '50px',
                        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
                        color: 'white',
                      }}
                      onClick={() => handleAddToCart(false)}
                    >
                      Thêm vào giỏ
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: '50%',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #FF9A44, #FC6076)',
                        padding: '12px 0',
                        // borderRadius: '50px',
                        boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
                        color: 'white',
                      }}
                      onClick={() => handleAddToCart(true)}
                    >
                      Mua ngay
                    </Button>
                    <Divider sx={{ marginY: '10px' }} />
                    <Typography variant="body2" fontWeight="600" color="#777">
                      Mã sản phẩm: {product.code}
                    </Typography>
                    <Typography variant="body2" fontWeight="600" color="#777">
                      Danh mục:&nbsp;
                      {product.categories.map((category, index) => (
                        <span key={category.id}>
                          <Link
                            href={`/categories/${category.id}`}
                            underline="hover"
                            color="primary"
                            sx={{ fontSize: '0.875rem' }}
                          >
                            {category.name}
                          </Link>
                          {index < product.categories.length - 1 && ', '}
                        </span>
                      ))}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ marginY: '20px' }} />
                  <ProductDetailDescriptionContainer product={product} />
                </Grid>
              </Grid>
            </Container>
            <SuggestedProductsByCategory
              categoryId={product.categories.at(0)?.id as string}
              currentProductId={product.id}
            />
            <CustomArtworkRequest />
          </>
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 5 }}>Không có sản phẩm nào.</Typography>
        )}
      </Box>
      <Footer />
      <WallViewDialog open={openWallView} onClose={() => setOpenWallView(false)} imageUrl={product?.imageUrl} />
      <ZoomViewDialog open={openZoomView} onClose={() => setOpenZoomView(false)} imageUrl={product?.imageUrl} />
    </div>
  );
};

export default ProductDetailView;
