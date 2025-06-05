import { Box, Grid, Button, CircularProgress, Typography } from '@mui/material';
import { GalleryDescription, GalleryTitle, ProductGalleryItem } from './components';
import { BUTTON_TEXT } from '@/views/Home/const';
import { artworkService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import GalleryLayout from './components/GalleryLayout';

const ProductGallery = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['artworks'],
    queryFn: artworkService.getArtworks,
    staleTime: 1000 * 60 * 5, // Cache trong 5 phút
  });

  return (
    <GalleryLayout>
      <GalleryTitle content="Hàng mới về" />
      <GalleryDescription content="Bộ sưu tập tranh nghệ thuật đẳng cấp, bắt nhịp xu hướng thế giới." />

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
      ) : isError ? (
        <Typography color="error" sx={{ mt: 5, textAlign: 'center' }}>
          Không thể tải danh mục. Vui lòng thử lại.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 5 }}>
          {products?.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <ProductGalleryItem item={product} />
            </Grid>
          ))}
        </Grid>
      )}

      <Button
        variant="text"
        sx={{ marginTop: '30px', fontSize: '20px', color: 'black', fontFamily: 'inherit' }}
        onClick={() => console.log('Xem tất cả được nhấn!')}
      >
        {BUTTON_TEXT.ALL}
      </Button>
    </GalleryLayout>
  );
};

export default ProductGallery;
