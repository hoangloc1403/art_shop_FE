import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import React from 'react';
import { useEventLogout } from '@/hooks';

interface PersonalInfoTabProps {
  user: {
    email: string;
    phoneNumber?: string;
    fullName?: string;
    address?: string;
  };
  form: {
    phoneNumber: string;
    fullName: string;
    address: string;
  };
  errors: { [key: string]: string };
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
  onReset: () => void;
  onCancel: () => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  user,
  form,
  errors,
  isEditing,
  onInputChange,
  onUpdate,
  onReset,
  onCancel,
}) => {
  const onLogout = useEventLogout();

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <PersonOutline />
        <Typography variant="h6">Thông tin cá nhân</Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Email:</Typography>
          <Typography color="text.secondary">{user.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Số điện thoại:</Typography>
          {isEditing ? (
            <TextField
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={onInputChange}
              fullWidth
              size="small"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          ) : (
            <Typography color="text.secondary">{user.phoneNumber || 'Chưa cập nhật'}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2">Họ và Tên:</Typography>
          {isEditing ? (
            <TextField
              name="fullName"
              value={form.fullName}
              onChange={onInputChange}
              fullWidth
              size="small"
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          ) : (
            <Typography color="text.secondary">{user.fullName || 'Chưa cập nhật'}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Địa chỉ:</Typography>
          {isEditing ? (
            <TextField
              name="address"
              value={form.address}
              onChange={onInputChange}
              fullWidth
              size="small"
              error={!!errors.address}
              helperText={errors.address}
            />
          ) : (
            <Typography color="text.secondary">{user.address || 'Chưa cập nhật'}</Typography>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        {isEditing ? (
          <>
            <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={onUpdate}>
              Lưu
            </Button>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={onReset}>
              Đặt lại
            </Button>
            <Button variant="outlined" color="error" onClick={onCancel}>
              Hủy
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => onUpdate()}>
              Cập nhật thông tin
            </Button>
            {/* Nếu bạn muốn xử lý logout ở đây thì thêm handler vào props */}
            <Button variant="outlined" color="error" onClick={onLogout}>
              Đăng xuất
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default PersonalInfoTab;
