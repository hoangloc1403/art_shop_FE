import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SignInFormInputs {
  email: string;
  password: string;
}

interface SignInFormProps {
  onLogin: (data: SignInFormInputs) => void;
}

// Schema validation bằng Yup
const validationSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

const SignInForm = ({ onLogin }: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onLogin)}>
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
        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
    </Box>
  );
};

export default SignInForm;
