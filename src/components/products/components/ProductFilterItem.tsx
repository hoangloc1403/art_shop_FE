import React from 'react';
import { Box, Typography } from '@mui/material';
import { Product } from '@/types';
import { formatPrice } from '@/utils/format';
import { useNavigate } from 'react-router-dom';

type ProductFilterItemProps = {
  product: Product;
};

const ProductFilterItem: React.FC<ProductFilterItemProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        cursor: 'pointer',
        maxWidth: 250,
        width: '100%',
        textAlign: 'center',
      }}
      onClick={() => navigate(`/product/detail/${product.id}`)}
    >
      {/* Ảnh không viền, không căn giữa, chiếm full box */}
      <Box
        sx={{
          width: '100%',
          height: 300, // Chiều cao cố định cho mọi item
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={product.imageUrl}
          alt={product.title}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain', // Không crop ảnh
            display: 'block',
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ fontFamily: '"Orpheus Pro", serif', color: '#423E31', fontWeight: 400 }}>
        {product.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontFamily: '"Orpheus Pro", serif', color: 'rgb(174, 0, 17)', fontWeight: 800, fontSize: '14px' }}
      >
        {formatPrice(product.price)}
      </Typography>
    </Box>
  );
};

export default ProductFilterItem;
