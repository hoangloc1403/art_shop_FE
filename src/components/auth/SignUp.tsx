import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services';
import SignUpForm from './components/SignUpForm';
import { useSnackbar } from 'notistack';

const SignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onSignUp = async (data: { email: string; password: string; fullName: string; phoneNumber: string }) => {
    try {
      await authService.signup(data);
      enqueueSnackbar('Đăng ký thành công, Hãy tiến hành đăng nhập!', { variant: 'success' });
      navigate('/sign_in', { replace: true });
    } catch (error) {
      console.error('Signup failed:', error);
      enqueueSnackbar('Đăng ký thất bại, vui lòng kiểm tra lại thông tin!', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1743119638006-a01d4625745d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
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
          bgcolor: 'rgba(0, 0, 0, 0.6)', // overlay đen mờ để làm nổi form
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
          Đăng ký
        </Typography>
        <SignUpForm onSignUp={onSignUp} />
      </Paper>
    </Box>
  );
};

export default SignUp;
