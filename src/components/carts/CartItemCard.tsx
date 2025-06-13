import React, { useEffect, useState } from 'react';
import { Card, Typography, TextField, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CartItem } from '@/types';
import { formatPrice } from '@/utils/format';
import { useNavigate } from 'react-router-dom';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (artworkId: string, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const navigate = useNavigate();

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      onUpdateQuantity(item.artwork.id, value);
    }
  };

  const handleNavigate = () => {
    navigate(`/product/detail/${item.artwork.id}`);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        mb: 2,
        boxShadow: 3,
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => onRemove(item.id)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          padding: '4px',
          color: 'error.main',
          '&:hover': {
            backgroundColor: '#ffe6e6',
          },
        }}
      >
        <Delete fontSize="small" />
      </IconButton>

      {/* BÊN TRÁI */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          onClick={handleNavigate}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 2,
          }}
        >
          <img
            src={item.artwork.imageUrl || '/img/default-image.jpg'}
            alt={item.artwork.title}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={handleNavigate}>
            {item.artwork.title}
          </Typography>
          <Typography color="textSecondary">{formatPrice(item.price)}</Typography>
          <TextField
            label="Số lượng"
            type="number"
            variant="outlined"
            size="small"
            value={quantity}
            onChange={handleQuantityChange}
            sx={{ width: 80, mt: 1 }}
            inputProps={{ min: 1, max: item.artwork.quantity }}
          />
        </Box>
      </Box>

      {/* BÊN PHẢI */}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {formatPrice(item.price * quantity)}
        </Typography>
      </Box>
    </Card>
  );
};

export default CartItemCard;
