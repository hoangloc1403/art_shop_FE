import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TableSortLabel,
  Pagination,
  Chip,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  Avatar,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services';
import OrderItem from '@/types/OrderItem';
import { formatPrice } from '@/utils/format';
import { OrderStatus } from '@/types/Order';
import { renderStatusText } from './const/utils';
import { enqueueSnackbar } from 'notistack';

const OrderManagementTable = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const { data: orders = [] } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: orderService.getOrders,
  });

  const sortedOrders = useMemo(() => {
    const sorted = [...orders].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (typeof valueA === 'string') {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
    return sorted;
  }, [orders, sortBy, sortOrder]);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedOrders.slice(start, start + rowsPerPage);
  }, [sortedOrders, page, rowsPerPage]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const toggleExpand = (orderId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderService.updateOrder(orderId, { status: newStatus });
      enqueueSnackbar('Cập nhật trạng thái thành công', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    } catch (error) {
      enqueueSnackbar('Cập nhật trạng thái thất bại', { variant: 'error' });
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Quản lý đơn hàng
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Tên khách</TableCell>
              <TableCell>SĐT</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Phương thức</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'totalPrice'}
                  direction={sortOrder}
                  onClick={() => handleSort('totalPrice')}
                >
                  Tổng tiền
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'createdAt'}
                  direction={sortOrder}
                  onClick={() => handleSort('createdAt')}
                >
                  Ngày tạo
                </TableSortLabel>
              </TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, index) => (
              <>
                <TableRow key={order.id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{order.code}</TableCell>
                  <TableCell>{order.shippingName}</TableCell>
                  <TableCell>{order.shippingPhone}</TableCell>
                  <TableCell>{order.shippingAddress}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.paymentMethod === 'credit_card' ? 'Thẻ tín dụng' : 'COD'}
                      color="info"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        disabled={order.status === 'cancelled'}
                      >
                        {Object.values(OrderStatus).map((status) => (
                          <MenuItem key={status} value={status}>
                            {renderStatusText(status as OrderStatus)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => toggleExpand(order.id)}>
                      {expandedRows.has(order.id) ? 'Ẩn' : 'Xem sản phẩm'}
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={10} sx={{ p: 0, border: 0 }}>
                    <Collapse in={expandedRows.has(order.id)} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Chi tiết đơn hàng
                        </Typography>

                        <Table size="small" aria-label="order-items">
                          <TableHead>
                            <TableRow>
                              <TableCell>Hình ảnh</TableCell>
                              <TableCell>Sản phẩm</TableCell>
                              <TableCell align="right">Số lượng</TableCell>
                              <TableCell align="right">Đơn giá</TableCell>
                              <TableCell align="right">Thành tiền</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.items.map((item: OrderItem) => {
                              const subTotal = item.price * item.quantity;
                              return (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <Avatar
                                      src={item.artwork.imageUrl}
                                      alt={item.artwork.title}
                                      variant="square"
                                      sx={{ width: 48, height: 48 }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {item.artwork.title}
                                  </TableCell>
                                  <TableCell align="right">{item.quantity}</TableCell>
                                  <TableCell align="right">{formatPrice(item.price)}</TableCell>
                                  <TableCell align="right">{formatPrice(subTotal)}</TableCell>
                                </TableRow>
                              );
                            })}

                            <TableRow>
                              <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                                Tổng đơn hàng
                              </TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                {formatPrice(order.totalPrice)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" py={2}>
          <Pagination
            count={Math.ceil(orders.length / rowsPerPage)}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default OrderManagementTable;
