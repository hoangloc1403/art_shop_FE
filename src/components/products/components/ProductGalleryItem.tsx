import { Product } from '@/types';
import { Box, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

interface Props {
  item: Product;
}

const ProductGalleryItem: FunctionComponent<Props> = ({ item }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.04)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
      <Box sx={{ padding: '16px' }}>
        <Typography variant="body1" fontWeight="bold" color="black">
          {item.title}
        </Typography>
        <Typography variant="body2" color="textPrimary">
          {item.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductGalleryItem;
