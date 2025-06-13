import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { categoryService } from '@/services';

interface CategoryAddFormInputs {
  name: string;
  description: string;
  image: FileList;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên danh mục'),
  description: yup.string().required('Vui lòng nhập mô tả'),
  image: yup
    .mixed()
    .required('Vui lòng chọn ảnh')
    .test('fileExists', 'Cần chọn ảnh', (value) => !!value?.length),
});

export const CategoryAddForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategoryAddFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [imageFile]);

  const handleFormSubmit = async (data: CategoryAddFormInputs) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', data.image[0]);

      const uploadRes = await categoryService.uploadImage(formData);
      const { url: imageUrl, key: imageKey } = uploadRes.data ?? {};

      if (!imageUrl) throw new Error('Không lấy được đường dẫn ảnh');

      const payload = {
        name: data.name,
        description: data.description,
        imageUrl: imageKey,
      };

      await onSubmit(payload);
    } catch (error) {
      console.error('Lỗi tạo danh mục:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên danh mục"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mô tả"
            fullWidth
            multiline
            rows={3}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button component="label" variant="outlined" fullWidth>
            {imageFile?.length > 0 ? 'Thay ảnh' : 'Chọn ảnh'}
            <input type="file" hidden {...register('image')} />
          </Button>
          {errors.image && (
            <Typography color="error" variant="caption">
              {errors.image.message}
            </Typography>
          )}
          {imagePreview && (
            <Box mt={2}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
            </Box>
          )}
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Tạo danh mục'}
      </Button>
    </Box>
  );
};
