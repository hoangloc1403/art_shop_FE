import { useQuery } from '@tanstack/react-query';
import { GalleryDescription, GalleryTitle } from './components';
import GalleryLayout from './components/GalleryLayout';
import CategoryFeaturedGalleryItem from './components/CategoryFeaturedGalleryItem';
import { categoryService } from '@/services';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const descriptions = [
  'Khơi gợi cảm hứng và kết nối qua những tác phẩm nghệ thuật nguyên bản.',
  'Khám phá bộ sưu tập nghệ thuật độc đáo để làm bừng sáng không gian sống của bạn.',
  'Duyệt tranh trực tuyến với nhiều phong cách đa dạng phù hợp với gu thẩm mỹ của bạn.',
];

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
      <Box
        sx={{
          width: '220px',
          height: '1px',
          backgroundColor: '#423E31',
          margin: '8px auto 0',
        }}
      ></Box>
      {/* <GalleryDescription content="Tuyển tập những thể loại tranh ấn tượng, bắt kịp xu hướng nghệ thuật thế giới — nơi bạn có thể tìm thấy phong cách yêu thích và thổi hồn vào không gian sống." /> */}

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
      ) : isError ? (
        <Typography color="error" sx={{ mt: 5, textAlign: 'center' }}>
          Không thể tải danh mục. Vui lòng thử lại.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 5 }}>
          {categories?.slice(0, 3).map((product, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CategoryFeaturedGalleryItem item={product} description={descriptions[index]} />
            </Grid>
          ))}
        </Grid>
      )}
    </GalleryLayout>
  );
};

export default CategoryFeaturedGallery;
