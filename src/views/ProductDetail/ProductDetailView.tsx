import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import Grid from '@mui/material/Grid';
import { Button, CardMedia, Divider, Stack, Typography, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Facebook, Twitter, Pinterest, LinkedIn, WhatsApp, Chat } from '@mui/icons-material';
import { useState } from 'react';
import WallViewDialog from './WallViewDialog';
import ProductGallery from '../Welcome/ProductGallery';

const ProductDetailView = () => {
  const [openWallView, setOpenWallView] = useState(false);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <Box sx={{ padding: '40px', backgroundColor: '#ffffff' }}>
        <Grid container spacing={4} alignItems="stretch">
          {/* Hình ảnh sản phẩm */}
          <Grid item xs={6}>
            <CardMedia
              component="img"
              height="550"
              image={'/img/tranh-tinh-vat.jpg'}
              alt={'Tranh phong cảnh'}
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
                Thuyền cá về
              </Typography>
              <Typography variant="h5" color="#d32f2f" fontWeight="bold">
                12.000.000 ₫
              </Typography>
              <Typography variant="body1" color="#555">
                Chất liệu: Sơn dầu
              </Typography>
              <Typography variant="body1" color="#555">
                Kích thước: 80cm x 120cm
              </Typography>
              <Typography variant="body1" color="#777">
                Năm sáng tác: 2022
              </Typography>
              <Typography variant="body1" color="#777">
                Mã sản phẩm: 22239
              </Typography>
              <Typography variant="body1" color="#777">
                Số lượt xem: 4037
              </Typography>
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
        {/* Chia sẻ */}
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
      {/* Dialog xem tranh trên tường */}
      <WallViewDialog open={openWallView} onClose={() => setOpenWallView(false)} />
    </div>
  );
};

export default ProductDetailView;
