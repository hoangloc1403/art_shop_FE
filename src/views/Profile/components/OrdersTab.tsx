import { OrderTable } from '@/components/orders';
import { PersonOutline } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const OrdersTab: React.FC = () => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <PersonOutline />
        <Typography variant="h6">Đơn hàng của tôi</Typography>
      </Stack>
      <OrderTable />
    </Box>
  );
};

export default OrdersTab;
