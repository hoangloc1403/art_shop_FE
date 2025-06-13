import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface CartSummaryProps {
  totalPrice: number;
  onCheckout?: () => void;
  onApplyCoupon?: (code: string) => void;
}

const CartSummary = ({ totalPrice, onCheckout, onApplyCoupon }: CartSummaryProps) => {
  const [coupon, setCoupon] = useState('');

  const handleApply = () => {
    if (onApplyCoupon) onApplyCoupon(coupon.trim());
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        backgroundColor: 'white',
        border: '1px solid #eee',
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        Tóm tắt đơn hàng
      </Typography>

      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Tổng phụ</Typography>
          <Typography>{totalPrice.toLocaleString()} VND</Typography>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>Tổng cộng</Typography>
          <Typography fontWeight={600}>{totalPrice.toLocaleString()} VND</Typography>
        </Stack>

        <Button
          variant="contained"
          color="error"
          fullWidth
          size="large"
          onClick={onCheckout}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            backgroundColor: '#d32f2f',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: '#b71c1c',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            },
            ':active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Tiến hành thanh toán
        </Button>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight={600}>
          Phiếu ưu đãi
        </Typography>

        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            placeholder="Nhập mã giảm giá"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={handleApply}
            sx={{
              px: 3,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Áp dụng
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartSummary;
