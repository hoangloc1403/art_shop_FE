import { Box, Grid2, Button } from '@mui/material';
import { imagesProducts } from '../Home/mocData';
import { BUTTON_TEXT } from '../Home/const';
import ProductGalleryTitle from './ProductGalleryTitlte';
import ProductGalleryDescription from './ProductGalleryDescription';
import ProductGalleryItem from './ProductGalleryItem';

const ProductGallery = () => {
  return (
    <Box sx={{ padding: '70px', textAlign: 'center' }}>
      <ProductGalleryTitle content="Hàng mới về" />
      <ProductGalleryDescription
        content="Bộ sưu tập tranh nghệ thuật đẳng cấp, bắt nhịp xu hướng thế giới, dành riêng cho những người yêu nghệ thuật
        tranh vẽ."
      />
      <Grid2 container spacing={4} sx={{ mt: 5 }} component="div">
        {imagesProducts.map((product, index) => (
          <Grid2 xs={12} sm={6} md={3} key={index} component="div">
            <ProductGalleryItem item={product} />
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
    </Box>
  );
};

export default ProductGallery;
