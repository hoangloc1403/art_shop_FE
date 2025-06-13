import { useState, useEffect } from 'react';
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
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { PaymentMethod } from '@/types/Order';
import { orderService, userService } from '@/services';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { User } from '@/types';
import { InterFontWrapper } from '@/layout/components';

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH_ON_DELIVERY);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  // Autofill user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user: User = await userService.getProfile();

        if (selectedAddress === 'old') {
          setValue('fullName', user.fullName || '');
          setValue('address', user.address || '');
          setValue('phone', user.phoneNumber || '');
          setValue('email', user.email || '');
        } else {
          setValue('fullName', '');
          setValue('address', '');
          setValue('phone', '');
          setValue('email', '');
        }
      } catch (error) {
        console.error('Không thể lấy thông tin người dùng:', error);
      }
    };

    fetchProfile();
  }, [selectedAddress, setValue]);

  const onSubmit = async (data: FormValues) => {
    const orderData = {
      paymentMethod,
      shippingAddress: selectedAddress === 'new' ? data.address : 'Địa chỉ cũ',
      shippingPhone: selectedAddress === 'new' ? data.phone : '0909000000',
      shippingName: selectedAddress === 'new' ? data.fullName : 'Nguyễn Văn A',
    };

    try {
      const response = await orderService.createOrder(orderData);
      enqueueSnackbar('Đặt hàng thành công!', { variant: 'success' });
      navigate('/checkout/success');
    } catch (error: any) {
      console.error('Đặt hàng thất bại:', error);

      if (error?.response?.status === 409) {
        enqueueSnackbar(error.response.data.message || 'Sản phẩm trong giỏ không đủ số lượng.', {
          variant: 'error',
        });
        navigate('/cart');
      } else {
        enqueueSnackbar('Có lỗi xảy ra khi đặt hàng.', { variant: 'error' });
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col" style={{ fontFamily: '"Open Sans", sans-serif' }}>
      <Header />
      <InterFontWrapper>
        <Container maxWidth="md" sx={{ marginTop: '100px', fontFamily: '"Open Sans", sans-serif' }}>
          <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center">
            Thanh Toán
          </Typography>

          <Card sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
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
          </Card>

          <Card sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Phương thức thanh toán
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Chọn phương thức</FormLabel>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>
                <FormControlLabel
                  value={PaymentMethod.CASH_ON_DELIVERY}
                  control={<Radio color="primary" />}
                  label="Thanh toán khi nhận hàng"
                />
              </RadioGroup>
            </FormControl>
          </Card>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              mb: 6,
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="text"
              onClick={() => navigate('/cart')}
              sx={{
                fontSize: '1rem',
                textTransform: 'none',
                fontWeight: 500,
                fontFamily: '"Open Sans", sans-serif',
                color: 'rgb(66, 62, 49)',
                ':hover': {
                  backgroundColor: 'white',
                  color: 'rgb(44, 39, 24)',
                },
              }}
            >
              ← Quay lại giỏ hàng
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontFamily: '"Open Sans", sans-serif',
                backgroundColor: 'rgb(9, 41, 51)',
                ':hover': {
                  backgroundColor: 'rgb(3,19,25)',
                },
              }}
            >
              Xác nhận đặt hàng
            </Button>
          </Box>
        </Container>
      </InterFontWrapper>
      <Footer />
    </div>
  );
};

export default CheckoutView;
