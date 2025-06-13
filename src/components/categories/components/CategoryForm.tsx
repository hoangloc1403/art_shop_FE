import { Box, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { categoryService } from '@/services';

interface CategoryFormInputs {
  name: string;
  description: string;
  image?: FileList;
}

interface CategoryFormProps {
  onSubmit: (data: any) => void;
  initialData?: {
    name: string;
    description: string;
    imageUrl?: string;
  };
  isEdit?: boolean;
}

const CategoryForm = ({ onSubmit, initialData, isEdit = false }: CategoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);

  const validationSchema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập tên danh mục'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    image: yup.mixed().test('fileExists', 'Vui lòng chọn ảnh', function (value) {
      const hasExistingImage = !!imagePreview;
      return hasExistingImage || (!!value && value.length > 0);
    }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
    },
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

  const handleFormSubmit = async (data: CategoryFormInputs) => {
    try {
      setLoading(true);
      let imageKey = initialData?.imageUrl;

      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append('file', data.image[0]);
        const resJson = await categoryService.uploadImage(formData);
        imageKey = resJson.data.key;
      }

      const payload = {
        name: data.name,
        description: data.description,
        imageUrl: imageKey,
      };

      await onSubmit(payload);
    } catch (error) {
      console.error('Lỗi submit:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {isEdit ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={3}>
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
              {imageFile?.length > 0 || imagePreview ? 'Thay ảnh' : 'Chọn ảnh'}
              <input type="file" hidden {...register('image')} />
            </Button>
            {errors.image && (
              <Typography color="error" variant="caption">
                {errors.image.message}
              </Typography>
            )}

            {imagePreview && (
              <Box
                mt={2}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : isEdit ? 'Cập nhật' : 'Tạo danh mục'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CategoryForm;
