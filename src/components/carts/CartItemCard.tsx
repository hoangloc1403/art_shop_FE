import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CartItem } from '@/types';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, boxShadow: 3 }}>
      <img
        src={item.artwork.imageUrl || '/img/default-image.jpg'}
        alt={item.artwork.title}
        style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{item.artwork.title}</Typography>
        <Typography color="textSecondary">{item.price.toLocaleString()} VND</Typography>
        <TextField
          label="Số lượng"
          type="number"
          variant="outlined"
          size="small"
          value={item.quantity}
          sx={{ width: 80, mt: 1 }}
        />
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => onRemove(item.id)}>
          Xóa
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItemCard;
