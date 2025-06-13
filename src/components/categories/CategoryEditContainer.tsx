import { AppView } from '@/components';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categoryService } from '@/services';
import { enqueueSnackbar } from 'notistack';
import CategoryForm from './components/CategoryForm';

const CategoryEditContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoryService.getCategory(id!);
        setInitialData(data);
      } catch (err) {
        console.error('Không thể tải danh mục:', err);
        alert('Không thể tải danh mục');
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateCategory = async (payload: any) => {
    try {
      const isFullUrl = payload.imageUrl?.startsWith('http://') || payload.imageUrl?.startsWith('https://');

      if (isFullUrl) {
        try {
          payload.imageUrl = new URL(payload.imageUrl).pathname;
          payload.imageUrl = payload.imageUrl.slice(1);
        } catch {
          console.warn('Invalid URL, giữ nguyên:', payload.imageUrl);
        }
      }
      console.log(payload);

      await categoryService.updateCategory(id!, payload);
      enqueueSnackbar('Cập nhật thể loại thành công!', { variant: 'success' });
      navigate('/admin/categories');
    } catch (error) {
      console.error(error);
      if (error.response?.status === 409) {
        enqueueSnackbar('Tiêu đề thể loại đã tồn tại!', { variant: 'error' });
      } else {
        enqueueSnackbar('Cập nhật thể loại thất bại!', { variant: 'error' });
      }
    }
  };

  return (
    <AppView>
      {initialData && <CategoryForm onSubmit={handleUpdateCategory} initialData={initialData} isEdit />}
    </AppView>
  );
};

export default CategoryEditContainer;
