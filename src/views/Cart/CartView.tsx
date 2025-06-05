import React from 'react';
import { Container, Grid, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { cartService } from '@/services';
import { Cart } from '@/types';
import { CartItemCard, CartSummary } from '@/components/carts';

const CartView: React.FC = () => {
  const {
    data: cart,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Cart, Error>({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
  });

  const handleRemoveItem = async (id: string) => {
    try {
      await cartService.removeCartItem(id);
      refetch();
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  const totalPrice = cart ? cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Container className="p-4 flex-1">
        <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center">
          Giỏ Hàng
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error" sx={{ textAlign: 'center', mt: 5 }}>
            {error?.message || 'Không thể tải giỏ hàng.'}
          </Typography>
        ) : cart && cart.items.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {cart.items.map((item) => (
                <CartItemCard key={item.id} item={item} onRemove={handleRemoveItem} />
              ))}
              <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
                ← Tiếp tục xem sản phẩm
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <CartSummary totalPrice={totalPrice} />
            </Grid>
          </Grid>
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 5 }}>Giỏ hàng của bạn trống.</Typography>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default CartView;
