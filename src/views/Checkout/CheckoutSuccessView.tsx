import { Button, Card, Container, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccessView = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <Card
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: 'white',
        }}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom color="success.main">
          Đặt hàng thành công!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 'bold' }}
        >
          Quay lại trang chủ
        </Button>
      </Card>
    </Container>
  );
};

export default CheckoutSuccessView;
