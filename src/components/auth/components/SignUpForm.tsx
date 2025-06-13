import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SignUpFormInputs {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface SignUpFormProps {
  onSignUp: (data: SignUpFormInputs) => void;
}

// Schema validation bằng Yup
const validationSchema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập họ và tên'),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9,10}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSignUp)}>
      <TextField
        label="Họ và tên"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <TextField
        label="Số điện thoại"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('phoneNumber')}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Mật khẩu"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: '#092933',
          color: 'white',
          fontWeight: 500,
          transition: 'all 0.3s ease',
          ':hover': { backgroundColor: '#e7d9b5', color: 'rgb(66,62,49)' },
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
      </Button>
    </Box>
  );
};

export default SignUpForm;
