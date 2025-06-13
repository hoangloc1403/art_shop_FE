import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CartEmptyContainer() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'text.secondary',
      }}
    >
      <ShoppingCartOutlinedIcon sx={{ fontSize: 80, mb: 2, color: 'grey.500' }} />
      <Typography variant="h5" gutterBottom>
        Giỏ hàng của bạn trống
      </Typography>
      <Typography sx={{ mb: 3, maxWidth: 360 }}>
        Bạn chưa thêm sản phẩm nào vào giỏ. Hãy khám phá bộ sưu tập của chúng tôi để tìm cho mình những tác phẩm yêu
        thích nhé!
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: 'rgb(9, 41, 51)',
          fontFamily: 'sans-serif',
          fontWeight: 500,
          px: 4,
          color: 'white',
          textTransform: 'capitalize',
          '&:hover': { bgcolor: '#014040' },
        }}
        onClick={() => navigate('/')}
      >
        Tiếp tục mua sắm
      </Button>
    </Box>
  );
}

export default CartEmptyContainer;
