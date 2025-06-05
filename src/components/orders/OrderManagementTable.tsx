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
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services';
import { useNavigate } from 'react-router-dom';
import OrderItem from '@/types/OrderItem';

const ORDER_STATUSES = ['pending', 'processing', 'delivered', 'cancelled'];

const OrderManagementTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    } catch (error) {
      console.error('Failed to update status:', error);
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
                      <Select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                        {ORDER_STATUSES.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{order.totalPrice.toLocaleString()}₫</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => toggleExpand(order.id)}>
                      {expandedRows.has(order.id) ? 'Ẩn' : 'Xem sản phẩm'}
                    </Button>
                    <Button size="small" onClick={() => navigate(`/admin/orders/${order.id}`)}>
                      Chi tiết
                    </Button>
                    <Button size="small" color="error">
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={10} sx={{ p: 0, border: 0 }}>
                    <Collapse in={expandedRows.has(order.id)} timeout="auto" unmountOnExit>
                      <Box sx={{ px: 2, py: 1, bgcolor: '#f9f9f9' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Danh sách sản phẩm:
                        </Typography>
                        <List dense>
                          {order.items.map((item: OrderItem, idx: number) => (
                            <div key={idx}>
                              <ListItem>
                                <ListItemText
                                  primary={`${item.name} x${item.quantity}`}
                                  secondary={`Giá: ${item.price.toLocaleString()}₫`}
                                />
                              </ListItem>
                              {idx < order.items.length - 1 && <Divider />}
                            </div>
                          ))}
                        </List>
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
