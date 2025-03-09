import { Grid2, Button } from '@mui/material';
import { GalleryDescription, GalleryTitle } from './components';
import { BUTTON_TEXT } from '@/views/Home/const';
import GalleryLayout from './components/GalleryLayout';
import CategoryFeaturedGalleryItem from './components/CategoryFeaturedGalleryItem';
import { categories } from './mockData';

const CategoryFeaturedGallery = () => {
  return (
    <GalleryLayout>
      <GalleryTitle content="Danh Mục Tranh Nổi Bật" />
      <GalleryDescription content="Tuyển tập những thể loại tranh ấn tượng, bắt kịp xu hướng nghệ thuật thế giới — nơi bạn có thể tìm thấy phong cách yêu thích và thổi hồn vào không gian sống." />

      <Grid2 container spacing={4} sx={{ mt: 5 }} component="div">
        {categories.map((product, index) => (
          <Grid2 xs={12} sm={6} md={3} key={index} component="div">
            <CategoryFeaturedGalleryItem item={product} />
          </Grid2>
        ))}
      </Grid2>

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
