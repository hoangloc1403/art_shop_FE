import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Box,
  Divider,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { formatDate } from '@/utils';
import { formatPrice } from '@/utils/format';
import { OrderStatus } from '@/types/Order';
import { formatPaymentMethod, renderStatusChip } from './const/utils';

const OrderDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrder(id!),
    enabled: !!id,
  });

  const cancelMutation = useMutation({
    mutationFn: () => orderService.cancelOrder(id!),
    onSuccess: () => {
      setOpenConfirm(false);
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !order) {
    return (
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Typography color="error">Không tìm thấy đơn hàng hoặc có lỗi xảy ra.</Typography>
      </Container>
    );
  }

  const handleCancelClick = () => setOpenConfirm(true);
  const handleConfirmCancel = () => cancelMutation.mutate();
  const handleCloseDialog = () => setOpenConfirm(false);

  return (
    <ThemeProvider
      theme={createTheme({
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
      })}
    >
      <Container maxWidth="md" sx={{ pt: 10 }}>
        <Typography variant="h5" mb={3} fontWeight={600}>
          Đơn hàng: {order.code}
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 1 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Thông tin giao hàng</Typography>

            <Stack spacing={1} pl={1}>
              <Typography variant="body1">
                <strong>Người nhận:</strong> {order.shippingName}
              </Typography>
              <Typography variant="body1">
                <strong>Số điện thoại:</strong> {order.shippingPhone}
              </Typography>
              <Typography variant="body1">
                <strong>Địa chỉ:</strong> {order.shippingAddress}
              </Typography>
            </Stack>

            <Divider />

            <Typography variant="h6">Thông tin đơn hàng</Typography>

            <Stack spacing={1} pl={1}>
              <Typography variant="body1">
                <strong>Phương thức thanh toán:</strong> {formatPaymentMethod(order.paymentMethod)}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <strong>Trạng thái:</strong> {renderStatusChip(order.status as OrderStatus)}
              </Typography>
              <Typography variant="body1">
                <strong>Ngày đặt:</strong> {formatDate(order.createdAt)}
              </Typography>
              <Typography variant="body1">
                <strong>Tổng tiền:</strong> {formatPrice(order.totalPrice)}
              </Typography>
            </Stack>

            {order.status === OrderStatus.PENDING && (
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelClick}
                  disabled={cancelMutation.isPending}
                >
                  {cancelMutation.isPending ? 'Đang hủy...' : 'Hủy đơn hàng'}
                </Button>
              </Box>
            )}
          </Stack>
        </Paper>

        <Typography variant="h6" mb={1}>
          Sản phẩm trong đơn hàng
        </Typography>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Tổng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Link to={`/product/detail/${item.artwork.id}`}>
                      <img
                        src={item.artwork.imageUrl || 'https://via.placeholder.com/50'}
                        alt={item.artwork.title}
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover', borderRadius: 4 }}
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/product/detail/${item.artwork.id}`}
                      style={{ textDecoration: 'none', color: '#1976d2' }}
                    >
                      {item.artwork.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{formatPrice(item.price)}</TableCell>
                  <TableCell align="right">{formatPrice(item.price * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Box textAlign="right" py={4}>
          <Button
            variant="text"
            onClick={() => navigate(-1)}
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
            ← Quay lại
          </Button>
        </Box>

        {/* Confirm Cancel Dialog */}
        <Dialog open={openConfirm} onClose={handleCloseDialog}>
          <DialogTitle>Xác nhận hủy đơn</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={cancelMutation.isPending}>
              Hủy
            </Button>
            <Button onClick={handleConfirmCancel} color="error" variant="contained" disabled={cancelMutation.isPending}>
              {cancelMutation.isPending ? 'Đang hủy...' : 'Xác nhận'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default OrderDetailContainer;
