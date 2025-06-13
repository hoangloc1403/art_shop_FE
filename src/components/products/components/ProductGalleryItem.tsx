import { Product } from '@/types';
import { formatPrice } from '@/utils/format';
import { Box, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: Product;
}

const ProductGalleryItem: FunctionComponent<Props> = ({ item }) => {
  const navigate = useNavigate();

  const navigateToProductDetail = () => {
    navigate(`/product/detail/${item.id}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // border: '1px solid #e0e0e0',
        // borderRadius: '8px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.04)',
          // boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
        },
        cursor: 'pointer',
      }}
      onClick={navigateToProductDetail}
    >
      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      {/* <Box sx={{ padding: '16px' }}> */}
      <Box>
        <Typography variant="h6" sx={{ fontFamily: '"Orpheus Pro", serif', color: '#423E31', fontWeight: 400 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: '"Orpheus Pro", serif', color: '#423E31', fontWeight: 600 }}>
          {formatPrice(item.price)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductGalleryItem;
