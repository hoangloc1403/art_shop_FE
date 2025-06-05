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
  Select,
  MenuItem,
} from '@mui/material';
import Header from '@/layout/components/Header';
import Footer from '@/views/Welcome/Footer';
import { orderService } from '@/services';
import { PaymentMethod } from '@/types/Order';

const CheckoutView: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState('new');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (selectedAddress === 'new') {
      const { fullName, address, phone } = formData;
      if (!fullName || !address || !phone) {
        alert('Vui lòng điền đầy đủ thông tin địa chỉ.');
        return;
      }
    }

    const orderData = {
      paymentMethod,
      shippingAddress: selectedAddress === 'new' ? formData.address : 'Địa chỉ cũ',
      shippingPhone: selectedAddress === 'new' ? formData.phone : '0909000000',
      shippingName: selectedAddress === 'new' ? formData.fullName : 'Nguyễn Văn A',
    };

    try {
      const response = await orderService.createOrder(orderData);
      alert('Đặt hàng thành công!');
      console.log('Order response:', response.data);
    } catch (error) {
      console.error('Đặt hàng thất bại:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    }
  };

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
              <TextField
                label="Họ và Tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
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
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>
              <FormControlLabel
                value={PaymentMethod.CREDIT_CARD}
                control={<Radio color="primary" />}
                label="Thẻ tín dụng/Ghi nợ"
              />
              <FormControlLabel
                value={PaymentMethod.BANK_TRANSFER}
                control={<Radio color="primary" />}
                label="Chuyển khoản ngân hàng"
              />
              <FormControlLabel
                value={PaymentMethod.CASH_ON_DELIVERY}
                control={<Radio color="primary" />}
                label="Thanh toán khi nhận hàng"
              />
              <FormControlLabel value={PaymentMethod.PAYPAL} control={<Radio color="primary" />} label="PayPal" />
            </RadioGroup>
          </FormControl>
        </Card>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 3, p: 2, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 2 }}
        >
          Xác nhận đặt hàng
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default CheckoutView;
