import { useEffect, useState } from 'react';
import { Button, CardMedia, Divider, Stack, Typography, CircularProgress, Grid, Box } from '@mui/material';
import { Facebook, Twitter, Pinterest, LinkedIn, WhatsApp, Chat } from '@mui/icons-material';
import { ProductGallery } from '@/components/products';
import { WallViewDialog } from './components';
import { Product } from '@/types';
import { artworkService } from '@/services';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { useParams } from 'react-router-dom';

const ProductDetailView = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const [openWallView, setOpenWallView] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await artworkService.getArtwork(id);
        if (response) {
          setProduct(response);
        } else {
          throw new Error('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
        setError('Không thể tải chi tiết sản phẩm. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <Box sx={{ padding: '40px', backgroundColor: '#ffffff' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', mt: 5 }}>
            {error}
          </Typography>
        ) : product ? (
          <Grid container spacing={4} alignItems="stretch">
            {/* Hình ảnh sản phẩm */}
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
                >
                  Phóng to
                </Button>
              </Stack>
            </Grid>
            {/* Thông tin sản phẩm */}
            <Grid item xs={3}>
              <Stack spacing={3} sx={{ padding: '20px' }}>
                <Typography variant="h4" fontWeight="bold" color="#333">
                  {product.title}
                </Typography>
                <Typography variant="h5" color="#d32f2f" fontWeight="bold">
                  {product.price} ₫
                </Typography>
                {/* <Typography variant="body1" color="#555">
                  Chất liệu: {product.material}
                </Typography>
                <Typography variant="body1" color="#555">
                  Kích thước: {product.dimensions}
                </Typography>
                <Typography variant="body1" color="#777">
                  Năm sáng tác: {product.year}
                </Typography>
                <Typography variant="body1" color="#777">
                  Mã sản phẩm: {product.id}
                </Typography>
                <Typography variant="body1" color="#777">
                  Số lượt xem: {product.views}
                </Typography> */}
                <Divider sx={{ marginY: '10px' }} />
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
                    padding: '14px 0',
                    borderRadius: '50px',
                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
                    color: 'white',
                  }}
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #FF9A44, #FC6076)',
                    padding: '14px 0',
                    borderRadius: '50px',
                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
                    color: 'white',
                  }}
                >
                  Mua ngay
                </Button>
              </Stack>
            </Grid>
            {/* Phần đặt hàng và thanh toán */}
            <Grid item xs={3}>
              <Stack spacing={2} sx={{ padding: '20px', backgroundColor: '#fff8e1', borderRadius: '10px' }}>
                <Typography variant="h6" fontWeight="bold" color="#333">
                  Đặt hàng và thanh toán
                </Typography>
                <Typography variant="body1" color="#444">
                  🛒 Đặt hàng trực tuyến trên website.
                </Typography>
                <Typography variant="body1" color="#444">
                  📞 Đặt hàng qua điện thoại (Zalo): 0983568361
                </Typography>
                <Typography variant="body1" color="#444">
                  💳 Thanh toán tiền mặt hoặc chuyển khoản.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 5 }}>Không có sản phẩm nào.</Typography>
        )}
        <Stack direction="row" spacing={2} sx={{ marginTop: '20px' }}>
          <Facebook sx={{ color: '#3b5998', fontSize: '30px', cursor: 'pointer' }} />
          <Twitter sx={{ color: '#1DA1F2', fontSize: '30px', cursor: 'pointer' }} />
          <Pinterest sx={{ color: '#E60023', fontSize: '30px', cursor: 'pointer' }} />
          <LinkedIn sx={{ color: '#0077B5', fontSize: '30px', cursor: 'pointer' }} />
          <WhatsApp sx={{ color: '#25D366', fontSize: '30px', cursor: 'pointer' }} />
          <Chat sx={{ color: '#0084FF', fontSize: '30px', cursor: 'pointer' }} />
        </Stack>
      </Box>
      <ProductGallery />
      <Footer />
      <WallViewDialog open={openWallView} onClose={() => setOpenWallView(false)} />
    </div>
  );
};

export default ProductDetailView;
