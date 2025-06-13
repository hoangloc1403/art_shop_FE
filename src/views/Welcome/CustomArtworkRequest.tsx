import { Box, Button, Typography } from '@mui/material';

const CustomArtworkRequest = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#e7e3d9', // màu nền tương tự ảnh
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      {/* Tiêu đề lớn */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Orpheus Pro", serif',
          fontWeight: 400,
          fontSize: { xs: '32px', sm: '48px', md: '56px' },
          color: '#2e2a21',
        }}
      >
        Vẽ tranh theo yêu cầu
      </Typography>

      {/* Mô tả */}
      <Typography
        sx={{
          mt: 3,
          fontSize: '18px',
          maxWidth: '600px',
          mx: 'auto',
          color: '#444',
          fontFamily: '"General Sans", sans-serif',
        }}
      >
        Bạn có những bức hình gia đình hoặc phong cảnh hoặc bất cứ hình ảnh nào bạn muốn chuyển thành tranh vẽ?
        <br />
        Hãy liên hệ với chúng tôi để biến yêu cầu của bạn thành hiện thực!
      </Typography>

      {/* Nút */}
      <Button
        variant="outlined"
        sx={{
          mt: 5,
          borderColor: '#423E31',
          color: '#423E31',
          textTransform: 'none',
          px: 4,
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: '"Orpheus Pro", serif',
          transition: 'all 0.5s ease',
          '&:hover': {
            borderColor: '#092933',
            backgroundColor: '#092933',
            color: '#fff',
          },
        }}
      >
        Gửi yêu cầu
      </Button>
    </Box>
  );
};

export default CustomArtworkRequest;
