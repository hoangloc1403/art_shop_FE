import React, { useRef } from 'react';
import { Avatar, Box, Divider, Tabs, Tab, Typography, IconButton } from '@mui/material';
import { PersonOutline, ShoppingCart, LockReset, Edit } from '@mui/icons-material';
import { User } from '@/types';

interface ProfileSidebarProps {
  user: User;
  tab: number;
  onChangeTab: (_: any, newValue: number) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user, tab, onChangeTab }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: '#1f1f1f',
        borderRight: '1px solid #2c2c2c',
        position: 'relative',
        color: 'white',
        // height: '100vh',
        boxShadow: '2px 0 8px rgba(0,0,0,0.15)', // tạo chiều sâu
      }}
    >
      <Box sx={{ textAlign: 'center', p: 3, position: 'relative' }}>
        <Avatar src={user.avatarUrl || ''} sx={{ width: 80, height: 80, mb: 1, mx: 'auto' }} />
        <IconButton
          size="small"
          onClick={handleEditClick}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            '&:hover': { bgcolor: 'grey.200' },
          }}
          aria-label="Chỉnh sửa ảnh đại diện"
        >
          <Edit fontSize="small" />
        </IconButton>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {user.fullName}
        </Typography>
      </Box>
      <Divider />
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={onChangeTab}
        TabIndicatorProps={{ sx: { backgroundColor: 'white' } }}
        sx={{
          px: 2,
          py: 2,
          bgcolor: '#1f1f1f',
          height: '100%',
          '& .MuiTab-root': {
            color: 'rgba(255, 255, 255, 0.8)',
            justifyContent: 'flex-start',
            fontFamily: '"Open Sans", sans-serif',
            textTransform: 'none',
            borderRadius: '8px',
            px: 2,
            mb: 1,
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.08)',
            },
          },
          '& .Mui-selected': {
            backgroundColor: 'rgba(255,255,255,0.12)',
            color: 'white',
            fontWeight: 'bold',
          },
          '& .MuiTabs-indicator': {
            display: 'none', // ẩn gạch dưới
          },
        }}
      >
        <Tab label="Thông tin cá nhân" icon={<PersonOutline />} iconPosition="start" />
        <Tab label="Đơn hàng của tôi" icon={<ShoppingCart />} iconPosition="start" />
        <Tab label="Đổi mật khẩu" icon={<LockReset />} iconPosition="start" />
      </Tabs>
    </Box>
  );
};

export default ProfileSidebar;
