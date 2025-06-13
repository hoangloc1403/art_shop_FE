import { Box, CircularProgress, createTheme, Paper, ThemeProvider, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '@/layout/components/Header';
import Footer from '../Welcome/Footer';
import { User } from '@/types';
import { userService } from '@/services';
import { enqueueSnackbar } from 'notistack';
import { ProfileContent, ProfileSidebar } from './components';

const ProfileView = () => {
  const [tab, setTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      });
      setErrors({});
      setIsEditing(false);
    }
  }, [user]);

  const handleChangeTab = (_: any, newValue: number) => {
    setTab(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Họ và tên không được để trống.';
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại không được để trống.';
    } else {
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(form.phoneNumber.trim())) {
        newErrors.phoneNumber = 'Số điện thoại không hợp lệ.';
      }
    }

    if (!form.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      await userService.updateProfile(form);
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
      setIsEditing(false);
      queryClient.invalidateQueries(['profile']);
    } catch (error) {
      enqueueSnackbar('Cập nhật thất bại', { variant: 'error' });
    }
  };

  const handleReset = () => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      });
      setErrors({});
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  if (isError || !user) {
    return (
      <>
        <Header />
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <Typography color="error">Không thể tải thông tin người dùng.</Typography>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ThemeProvider
        theme={createTheme({
          typography: {
            fontFamily: 'Inter, sans-serif',
          },
        })}
      >
        <Box sx={{ bgcolor: 'background.default', py: 6, minHeight: '100vh', mt: '64px' }}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: 1000,
              mx: 'auto',
              display: 'flex',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <ProfileSidebar user={user} tab={tab} onChangeTab={handleChangeTab} />

            <Box sx={{ flex: 1, p: 4 }}>
              <ProfileContent
                tab={tab}
                user={user}
                form={form}
                errors={errors}
                isEditing={isEditing}
                onInputChange={handleInputChange}
                onUpdate={() => {
                  if (isEditing) {
                    handleUpdate();
                  } else {
                    setIsEditing(true);
                  }
                }}
                onReset={handleReset}
                onCancel={() => {
                  setIsEditing(false);
                  handleReset();
                }}
              />
            </Box>
          </Paper>
        </Box>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default ProfileView;
