import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Avatar,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { artworkService, categoryService } from '@/services';

interface Category {
  id: string;
  name: string;
}

interface ProductAddFormInputs {
  title: string;
  description: string;
  shortDescription: string;
  medium: string;
  width: number;
  height: number;
  price: number;
  quantity: number;
  timestamp: string;
  categoryIds: string[];
  image: FileList;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Vui lòng nhập tên sản phẩm'),
  description: yup.string().required('Vui lòng nhập mô tả'),
  shortDescription: yup.string().required('Vui lòng nhập mô tả ngắn'),
  medium: yup.string().required('Vui lòng nhập chất liệu'),
  width: yup.number().required().positive().integer(),
  height: yup.number().required().positive().integer(),
  price: yup.number().required().positive(),
  quantity: yup.number().required().min(1),
  timestamp: yup.string().required('Vui lòng nhập ngày'),
  categoryIds: yup.array().min(1, 'Chọn ít nhất 1 danh mục'),
  image: yup
    .mixed()
    .required('Vui lòng chọn ảnh')
    .test('fileExists', 'Cần chọn ảnh', (value) => !!value?.length),
});

const ProductAddForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductAddFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const imageFile = watch('image');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getTreeCategories();
        console.log('Danh sách category:', categories);
        setCategories(categories);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách category:', error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleFormSubmit = async (data: ProductAddFormInputs) => {
    try {
      setLoading(true);

      // 1. Chuẩn bị file upload
      const formData = new FormData();
      formData.append('file', data.image[0]);

      // 2. Upload ảnh lên server
      const uploadRes = await artworkService.uploadImage(formData);

      // 3. Lấy URL (và key) trả về
      const { url: imageUrl, key: imageKey } = uploadRes.data ?? {};

      if (!imageUrl) {
        throw new Error('Không lấy được đường dẫn ảnh sau khi upload');
      }

      // 4. Tạo payload gửi API tạo sản phẩm
      const payload = {
        ...data,
        imageUrl: imageKey,
        categoryIds: data.categoryIds,
      };

      delete payload.image; // loại bỏ FileList trước khi gửi

      await onSubmit(payload);
    } catch (err) {
      console.error('Lỗi khi tạo sản phẩm:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tên sản phẩm"
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mô tả ngắn"
            fullWidth
            {...register('shortDescription')}
            error={!!errors.shortDescription}
            helperText={errors.shortDescription?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mô tả chi tiết"
            multiline
            rows={3}
            fullWidth
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Chất liệu"
            fullWidth
            {...register('medium')}
            error={!!errors.medium}
            helperText={errors.medium?.message}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Chiều rộng (cm)"
            type="number"
            fullWidth
            {...register('width')}
            error={!!errors.width}
            helperText={errors.width?.message}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Chiều cao (cm)"
            type="number"
            fullWidth
            {...register('height')}
            error={!!errors.height}
            helperText={errors.height?.message}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Giá (VNĐ)"
            type="number"
            fullWidth
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Số lượng"
            type="number"
            fullWidth
            {...register('quantity')}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ngày tạo"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('timestamp')}
            error={!!errors.timestamp}
            helperText={errors.timestamp?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.categoryIds}>
            <InputLabel id="category-select-label">Danh mục</InputLabel>
            <Controller
              control={control}
              name="categoryIds"
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || []} // <-- fix ở đây
                  labelId="category-select-label"
                  multiple
                  input={<OutlinedInput label="Danh mục" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const category = categories.find((cat) => cat.id === value);
                        return (
                          <Chip
                            key={value}
                            label={category?.name || value}
                            avatar={category?.imageUrl ? <Avatar src={category.imageUrl} /> : undefined}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={cat.imageUrl} alt={cat.name} sx={{ width: 32, height: 32 }} />
                        <Typography>{cat.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.categoryIds && (
              <Typography color="error" variant="caption">
                {errors.categoryIds.message}
              </Typography>
            )}
          </FormControl>
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
        {loading ? <CircularProgress size={24} /> : 'Tạo sản phẩm'}
      </Button>
    </Box>
  );
};

export default ProductAddForm;
