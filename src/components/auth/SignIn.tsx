import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { sessionStorageSet } from '@/utils';
import SignInForm from './components/SignInForm';
import { authService } from '@/services';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack';

const SignIn = () => {
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();
  const { enqueueSnackbar } = useSnackbar();

  const onLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await authService.login(data);
      const { access_token } = response;

      // Lưu token vào sessionStorage
      sessionStorageSet('access_token', access_token);

      // Cập nhật state đăng nhập
      dispatch({ type: 'LOG_IN' });

      const user = jwtDecode(access_token);
      if (user.role === 1) {
        navigate('/admin/products', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
      enqueueSnackbar('Đăng nhập thành công!', { variant: 'success' });
    } catch (error) {
      console.error('Login failed:', error);
      enqueueSnackbar('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.4)', // overlay đen mờ để làm nổi form
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Đăng nhập
        </Typography>
        <SignInForm onLogin={onLogin} />
      </Paper>
    </Box>
  );
};

export default SignIn;
