import { Grid, Button, CircularProgress, Typography, Box } from '@mui/material';
import { GalleryTitle, ProductGalleryItem } from './components';
import { BUTTON_TEXT } from '@/views/Home/const';
import { artworkService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import GalleryLayout from './components/GalleryLayout';
import { Paging, Product } from '@/types';
import { useNavigate } from 'react-router-dom';

const ProductFeaturedGallery = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery<Paging<Product>, boolean>({
    queryKey: ['artworks'],
    queryFn: () => artworkService.getArtworks(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <GalleryLayout>
      <GalleryTitle content="Khám phá nghệ thuật mới mỗi tuần" />
      <Box
        sx={{
          width: '220px',
          height: '1px',
          backgroundColor: '#423E31',
          margin: '8px auto 0',
        }}
      ></Box>

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
      ) : isError ? (
        <Typography color="error" sx={{ mt: 5, textAlign: 'center' }}>
          Không thể tải danh mục. Vui lòng thử lại.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 5 }}>
          {data?.items.slice(0, 5).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <ProductGalleryItem item={product} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box textAlign="center">
        <Button
          variant="text"
          sx={{ marginTop: '30px', fontSize: '20px', color: 'black', fontFamily: 'inherit' }}
          onClick={() => navigate('/product')}
        >
          {BUTTON_TEXT.ALL}
        </Button>
      </Box>
    </GalleryLayout>
  );
};

export default ProductFeaturedGallery;
