import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '@/services/userService';
import { useSnackbar } from 'notistack';

const schema = yup.object().shape({
  oldPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
  newPassword: yup.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu mới'),
});

type FormData = {
  oldPassword: string;
  newPassword: string;
};

const ChangePasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: FormData) => {
    try {
      await userService.changePassword(data);
      enqueueSnackbar('Đổi mật khẩu thành công', { variant: 'success' });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.response?.data?.message || 'Đã xảy ra lỗi', {
        variant: 'error',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={400}>
      <TextField
        label="Mật khẩu cũ"
        type="password"
        fullWidth
        margin="normal"
        {...register('oldPassword')}
        error={!!errors.oldPassword}
        helperText={errors.oldPassword?.message}
      />

      <TextField
        label="Mật khẩu mới"
        type="password"
        fullWidth
        margin="normal"
        {...register('newPassword')}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
        {isSubmitting ? 'Đang đổi...' : 'Đổi mật khẩu'}
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;
