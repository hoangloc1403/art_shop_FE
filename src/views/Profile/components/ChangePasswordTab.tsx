import React from 'react';
import { Typography } from '@mui/material';
import { ChangePasswordForm } from '@/components/users/components';

const ChangePasswordTab: React.FC = () => {
  return (
    <>
      <Typography variant="h6" mb={2}>
        Đổi mật khẩu
      </Typography>
      <ChangePasswordForm />
    </>
  );
};

export default ChangePasswordTab;
