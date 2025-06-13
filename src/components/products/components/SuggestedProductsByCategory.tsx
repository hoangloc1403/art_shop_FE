import { useQuery } from '@tanstack/react-query';
import { Grid, CircularProgress, Box } from '@mui/material';
import { artworkService } from '@/services';
import { Product, Paging } from '@/types';
import GalleryTitle from './GalleryTitlte';
import ProductGalleryItem from './ProductGalleryItem';

type Props = {
  categoryId: string;
  currentProductId: string;
};

const SuggestedProductsByCategory = ({ categoryId, currentProductId }: Props) => {
  const { data, isLoading, isError } = useQuery<Paging<Product>>({
    queryKey: ['suggested-artworks', categoryId],
    queryFn: () => artworkService.getArtworks({ categoryIds: [categoryId], limit: 10 }),
    staleTime: 1000 * 60 * 5,
  });

  const filteredProducts = data?.items.filter((p) => p.id !== currentProductId).slice(0, 3);

  if (isLoading) {
    return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  }

  if (isError || !filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ backgroundColor: 'rgb(236, 243, 249)', py: 5 }}>
      <GalleryTitle content="Tác phẩm cùng thể loại" />

      <Box
        sx={{
          width: '180px',
          height: '1px',
          backgroundColor: '#423E31',
          margin: '8px auto 32px',
        }}
      />

      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1200, mx: 'auto' }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductGalleryItem item={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SuggestedProductsByCategory;
