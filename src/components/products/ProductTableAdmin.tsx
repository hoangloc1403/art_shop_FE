import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Chip,
  Button,
  Box,
  TableSortLabel,
  Pagination,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { artworkService } from '@/services';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Paging, Product } from '@/types';
import { formatPrice } from '@/utils/format';

const ProductManagementTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const {
    data: { items: products = [], total = 0 } = {},
    isLoading,
    isError,
  } = useQuery<Paging<Product>>({
    queryKey: ['admin-artworks', page, sortBy, sortOrder],
    queryFn: () =>
      artworkService.getArtworks({
        page,
        limit: rowsPerPage,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Quản lý sản phẩm
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/admin/products/add')}>
          Thêm sản phẩm
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ minHeight: '600px', width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'title'}
                  direction={sortBy === 'title' ? sortOrder : 'asc'}
                  onClick={() => handleSort('title')}
                >
                  Tên sản phẩm
                </TableSortLabel>
              </TableCell>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Kích thước</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'price'}
                  direction={sortBy === 'price' ? sortOrder : 'asc'}
                  onClick={() => handleSort('price')}
                >
                  Giá
                </TableSortLabel>
              </TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Avatar src={product.imageUrl} alt={product.title} variant="rounded" />
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{product.title}</Typography>
                </TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>
                  {product.categories.map((cat) => (
                    <Chip key={cat.id} label={cat.name} sx={{ mr: 1, mb: 0.5 }} variant="outlined" />
                  ))}
                </TableCell>
                <TableCell>
                  {product.width} x {product.height} cm
                </TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <Button size="small" color="primary" onClick={() => navigate(`/admin/products/${product.id}/edit`)}>
                    Sửa
                  </Button>
                  <Button size="small" color="error">
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="center" py={3}>
          <Pagination
            count={Math.ceil(total / rowsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default ProductManagementTable;
