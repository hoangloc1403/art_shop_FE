import { useState, useEffect } from 'react';
import { Box, Grid, Button, CircularProgress, Typography } from '@mui/material';
import { GalleryDescription, GalleryTitle, ProductGalleryItem } from './components';
import { BUTTON_TEXT } from '@/views/Home/const';
import { Product } from '@/types';
import { artworkService } from '@/services';

const ProductGallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await artworkService.getArtworks();

        // console.log(response.data);
        if (response) {
          setProducts(response);
        } else {
          throw new Error('Dữ liệu từ API không hợp lệ');
        }
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ padding: '70px', textAlign: 'center' }}>
      <GalleryTitle content="Hàng mới về" />
      <GalleryDescription content="Bộ sưu tập tranh nghệ thuật đẳng cấp, bắt nhịp xu hướng thế giới." />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 5 }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={4} sx={{ mt: 5 }}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductGalleryItem item={product} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ mt: 3 }}>Không có sản phẩm nào.</Typography>
          )}
        </Grid>
      )}

      <Button
        variant="text"
        sx={{ marginTop: '30px', fontSize: '20px', color: 'black', fontFamily: 'inherit' }}
        onClick={() => console.log('Xem tất cả được nhấn!')}
      >
        {BUTTON_TEXT.ALL}
      </Button>
    </Box>
  );
};

export default ProductGallery;
