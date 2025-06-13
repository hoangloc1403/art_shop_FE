import { AppView } from '@/components';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '@/services';
import { enqueueSnackbar } from 'notistack';
import CategoryForm from './components/CategoryForm';

const CategoryAddContainer = () => {
  const navigate = useNavigate();

  const handleAddCategory = async (payload: any) => {
    try {
      await categoryService.createCategory(payload);
      enqueueSnackbar('Thêm thể loại thành công!', { variant: 'success' });
      navigate('/admin/categories');
    } catch (error) {
      console.error(error);
      if (error.response?.status === 409) {
        enqueueSnackbar('Tiêu đề thể loại đã tồn tại!', { variant: 'error' });
      } else {
        enqueueSnackbar('Thêm thể loại thất bại!', { variant: 'error' });
      }
    }
  };

  return (
    <AppView>
      <CategoryForm onSubmit={handleAddCategory} />
    </AppView>
  );
};

export default CategoryAddContainer;
