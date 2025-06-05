import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  TableSortLabel,
  Pagination,
  Avatar,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CategoryTableAdmin = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: categoryService.getTreeCategories,
  });

  const sortedCategories = useMemo(() => {
    const sorted = [...categories].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (typeof valueA === 'string') {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return 0;
    });
    return sorted;
  }, [categories, sortBy, sortOrder]);

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedCategories.slice(start, start + rowsPerPage);
  }, [sortedCategories, page, rowsPerPage]);

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
          Quản lý danh mục
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/admin/categories/add')}>
          Thêm danh mục
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
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Tên danh mục
                </TableSortLabel>
              </TableCell>
              <TableCell>Số sản phẩm</TableCell> {/* ✅ Thêm cột mới */}
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Avatar src={category.imageUrl} alt={category.name} variant="rounded" />
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{category.name}</Typography>
                </TableCell>
                <TableCell>{category.artworkCount?.toLocaleString() ?? 0}</TableCell>
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
            count={Math.ceil(categories.length / rowsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default CategoryTableAdmin;
