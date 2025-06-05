import { Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { sessionStorageSet } from '@/utils';
import SignInForm from './components/SignInForm';
import { authService } from '@/services';
import { jwtDecode } from 'jwt-decode';

const SignIn = () => {
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();

  const onLogin = async (data: { email: string; password: string }) => {
    try {
      console.log('Login Data ', data);
      const response = await authService.login(data);
      console.log('Login Response ', response);
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
    } catch (error) {
      console.error('Login failed:', error);
      alert('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        borderRadius: 2,
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Đăng nhập
      </Typography>
      <SignInForm onLogin={onLogin} />
    </Paper>
  );
};

export default SignIn;
