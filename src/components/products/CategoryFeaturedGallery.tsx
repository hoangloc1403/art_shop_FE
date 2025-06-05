import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GalleryDescription, GalleryTitle } from './components';
import { BUTTON_TEXT } from '@/views/Home/const';
import GalleryLayout from './components/GalleryLayout';
import CategoryFeaturedGalleryItem from './components/CategoryFeaturedGalleryItem';
import { categoryService } from '@/services';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const CategoryFeaturedGallery = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['treeCategories'],
    queryFn: categoryService.getTreeCategories,
  });

  return (
    <GalleryLayout>
      <GalleryTitle content="Danh Mục Tranh Nổi Bật" />
      <GalleryDescription content="Tuyển tập những thể loại tranh ấn tượng, bắt kịp xu hướng nghệ thuật thế giới — nơi bạn có thể tìm thấy phong cách yêu thích và thổi hồn vào không gian sống." />

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
      ) : isError ? (
        <Typography color="error" sx={{ mt: 5, textAlign: 'center' }}>
          Không thể tải danh mục. Vui lòng thử lại.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 5 }}>
          {categories?.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <CategoryFeaturedGalleryItem item={product} />
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

export default CategoryFeaturedGallery;
