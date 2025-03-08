import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Select,
  MenuItem,
} from '@mui/material';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';

const CheckoutPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState('new');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <Container className="p-6 flex-1">
        <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center" color="primary">
          Thanh Toán
        </Typography>

        <Card sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom color="text.primary">
            Chọn địa chỉ giao hàng
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="old">Địa chỉ cũ</MenuItem>
              <MenuItem value="new">Địa chỉ mới</MenuItem>
            </Select>
          </FormControl>
          {selectedAddress === 'new' && (
            <>
              <TextField label="Họ và Tên" fullWidth margin="normal" sx={{ bgcolor: 'white', borderRadius: 1 }} />
              <TextField label="Địa chỉ" fullWidth margin="normal" sx={{ bgcolor: 'white', borderRadius: 1 }} />
              <TextField label="Số điện thoại" fullWidth margin="normal" sx={{ bgcolor: 'white', borderRadius: 1 }} />
              <TextField label="Email" fullWidth margin="normal" sx={{ bgcolor: 'white', borderRadius: 1 }} />
            </>
          )}
        </Card>

        <Card sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom color="text.primary">
            Phương thức thanh toán
          </Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend" color="primary">
              Chọn phương thức
            </FormLabel>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <FormControlLabel value="credit_card" control={<Radio color="primary" />} label="Thẻ tín dụng/Ghi nợ" />
              <FormControlLabel
                value="bank_transfer"
                control={<Radio color="primary" />}
                label="Chuyển khoản ngân hàng"
              />
              <FormControlLabel value="cod" control={<Radio color="primary" />} label="Thanh toán khi nhận hàng" />
            </RadioGroup>
          </FormControl>
        </Card>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, p: 2, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 2 }}
        >
          Xác nhận đặt hàng
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
