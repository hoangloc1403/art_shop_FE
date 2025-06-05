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
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { artworkService } from '@/services';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductManagementTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin-artworks'],
    queryFn: artworkService.getArtworks,
  });

  const sortedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (typeof valueA === 'string') {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
    return sorted;
  }, [products, sortBy, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedProducts.slice(start, start + rowsPerPage);
  }, [sortedProducts, page, rowsPerPage]);

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
            {paginatedProducts.map((product, index) => (
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
                <TableCell>{product.price.toLocaleString()}₫</TableCell>
                <TableCell>
                  <Button size="small" color="primary">
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
            count={Math.ceil(products.length / rowsPerPage)}
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
