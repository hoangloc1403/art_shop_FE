import { Stack, Typography } from '@mui/material';

const OrderPaymentInformationContainer = () => {
  return (
    <Stack spacing={2} sx={{ padding: '20px', backgroundColor: '#fff8e1', borderRadius: '10px' }}>
      <Typography variant="h6" fontWeight="bold" color="#333">
        Đặt hàng và thanh toán
      </Typography>
      <Typography variant="body1" color="#444">
        🛒 Đặt hàng trực tuyến trên website.
      </Typography>
      <Typography variant="body1" color="#444">
        📞 Đặt hàng qua điện thoại (Zalo): 0373359912
      </Typography>
      <Typography variant="body1" color="#444">
        💳 Thanh toán tiền mặt hoặc chuyển khoản.
      </Typography>
    </Stack>
  );
};

export default OrderPaymentInformationContainer;
