import React from 'react';
import { Container, Grid, Typography, CircularProgress, Box, Button, Breadcrumbs, Link } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { cartService } from '@/services';
import { Cart } from '@/types';
import { CartItemCard, CartSummary } from '@/components/carts';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { CartEmptyContainer } from './components';

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
  const navigate = useNavigate();

  const handleRemoveItem = async (id: string) => {
    try {
      await cartService.removeCartItem(id);
      refetch();
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  const handleCheckout = async () => {
    navigate('/checkout');
  };

  const handleUpdateQuantity = async (artworkId: string, quantity: number) => {
    try {
      await cartService.addToCart({ artworkId, quantity }); // quantity mới
      refetch();
    } catch (error: any) {
      if (error.response?.status === 409) {
        console.log('Error when update quantity: ', error.response.data.message);
        enqueueSnackbar('Số lượng đã đạt giới hạn.', { variant: 'error' });
      } else {
        enqueueSnackbar('Đã xảy ra lỗi khi cập nhật số lượng.', { variant: 'error' });
      }
    }
  };

  const totalPrice = cart ? cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Container className="p-4 flex-1" sx={{ marginTop: '120px', marginBottom: '40px' }}>
        <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center" marginBottom={'20px'}>
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
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  fontFamily: '"General Sans", sans-serif',
                  color: 'rgb(66, 62, 49)',
                  borderColor: 'rgb(66, 62, 49)',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  ':hover': { backgroundColor: '#092933', color: '#fff' },
                }}
                onClick={() => navigate(-1)}
              >
                ← Tiếp tục xem sản phẩm
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <CartSummary totalPrice={totalPrice} onCheckout={handleCheckout} />
            </Grid>
          </Grid>
        ) : (
          <CartEmptyContainer />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default CartView;
