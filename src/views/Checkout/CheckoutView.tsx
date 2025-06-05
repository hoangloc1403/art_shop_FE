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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { PaymentMethod } from '@/types/Order';
import { orderService } from '@/services';

type FormValues = {
  fullName: string;
  address: string;
  phone: string;
  email: string;
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Họ và tên không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  phone: Yup.string()
    .required('Số điện thoại không được để trống')
    .matches(/^(0|\+84)\d{9,10}$/, 'Số điện thoại không hợp lệ'),
  email: Yup.string().email('Email không hợp lệ'),
});

const CheckoutView: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState('new');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const orderData = {
      paymentMethod,
      shippingAddress: selectedAddress === 'new' ? data.address : 'Địa chỉ cũ',
      shippingPhone: selectedAddress === 'new' ? data.phone : '0909000000',
      shippingName: selectedAddress === 'new' ? data.fullName : 'Nguyễn Văn A',
    };

    try {
      const response = await orderService.createOrder(orderData);
      alert('Đặt hàng thành công!');
      console.log('Order response:', response.data);
    } catch (error) {
      console.error('Đặt hàng thất bại:', error);
      alert('Có lỗi xảy ra khi đặt hàng.');
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
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Họ và Tên"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Địa chỉ"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Số điện thoại"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ bgcolor: 'white', borderRadius: 1 }}
                  />
                )}
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
          onClick={handleSubmit(onSubmit)}
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
