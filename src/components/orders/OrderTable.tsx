import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { formatDate } from '@/utils';
import { formatPrice } from '@/utils/format';
import { OrderStatus } from '@/types/Order';
import { useNavigate } from 'react-router-dom';
import { formatPaymentMethod, renderStatusChip } from './const/utils';

const OrderTable: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userOrders'],
    queryFn: orderService.getOrdersByUser,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Typography color="error" mt={2}>
        Có lỗi xảy ra khi tải đơn hàng.
      </Typography>
    );
  }

  if (data.length === 0) {
    return (
      <Typography color="text.secondary" mt={2}>
        Bạn chưa có đơn hàng nào.
      </Typography>
    );
  }

  return (
    <Box mt={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell align="center">STT</TableCell>
              <TableCell>Người nhận</TableCell>
              <TableCell>Thanh toán</TableCell>
              <TableCell align="right">Giá trị</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày đặt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order, index) => (
              <TableRow key={order.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/order/${order.id}`)}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{order.shippingName}</TableCell>
                <TableCell>{formatPaymentMethod(order.paymentMethod)}</TableCell>
                <TableCell align="right">{formatPrice(order.totalPrice)}</TableCell>
                <TableCell>{renderStatusChip(order.status as OrderStatus)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;
