import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Container, Grid, Box, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartView: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Tranh Sơn Dầu', price: 1200000, quantity: 1, image: '/img/tranh-phong-canh-bien1.jpg' },
    { id: 2, name: 'Tranh Phong Cảnh', price: 950000, quantity: 2, image: '/img/Resized_208x232.jpeg' },
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <Container className="p-4 flex-1">
        <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center">
          Giỏ Hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2, boxShadow: 3 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
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
                  <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => removeItem(item.id)}>
                    Xóa
                  </Button>
                </CardActions>
              </Card>
            ))}
            <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
              ← Tiếp tục xem sản phẩm
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Tổng số lượng
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Tổng phụ</Typography>
                <Typography>{totalPrice.toLocaleString()} VND</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" fontWeight={700}>
                <Typography>Tổng</Typography>
                <Typography>{totalPrice.toLocaleString()} VND</Typography>
              </Box>
              <Button variant="contained" color="error" fullWidth sx={{ mt: 3 }}>
                Tiến hành thanh toán
              </Button>
              <Typography variant="subtitle1" mt={2}>
                Phiếu ưu đãi
              </Typography>
              <TextField fullWidth placeholder="Mã ưu đãi" variant="outlined" sx={{ mt: 1 }} />
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Áp dụng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default CartView;
