import { AppView } from '@/components';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '@/services';
import { CategoryAddForm } from './components/CategoryAddForm';

const CategoryAddContainer = () => {
  const navigate = useNavigate();

  const handleAddCategory = async (payload: any) => {
    try {
      await categoryService.createCategory(payload);
      navigate('/admin/categories');
    } catch (error) {
      console.error(error);
      alert('Tạo danh mục thất bại, vui lòng thử lại');
    }
  };

  return (
    <AppView>
      <Typography variant="h4" gutterBottom>
        Thêm danh mục mới
      </Typography>
      <CategoryAddForm onSubmit={handleAddCategory} />
    </AppView>
  );
};

export default CategoryAddContainer;
