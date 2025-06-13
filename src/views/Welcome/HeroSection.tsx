import React from 'react';
import { Box, Button, Typography, Link, Grid } from '@mui/material';

export default function HeroSection() {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        bgcolor: 'white',
        overflow: 'hidden', // ngăn tràn chiều cao
        boxSizing: 'border-box',
      }}
    >
      {/* Left Side - Text */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center', // căn giữa theo chiều dọc
          justifyContent: 'center', // căn giữa theo chiều ngang
          height: '100%',
          p: { xs: 2, md: 6 },
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ maxWidth: 500 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 400, fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, color: '#423e31' }}
          >
            Nghệ thuật <br /> thay đổi cuộc sống
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#423e31' }}>
            Mang một tác phẩm nghệ thuật về nhà để cảm nhận trực tiếp. Nếu tác phẩm không phù hợp với không gian của
            bạn, hãy trả lại trong vòng bảy ngày kể từ khi nhận hàng để được hoàn tiền đầy đủ.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: 'fit-content',
              bgcolor: 'rgb(9, 41, 51)',
              fontFamily: '"General Sans", sans-serif',
              color: 'white',
              textTransform: 'capitalize',
              '&:hover': { bgcolor: '#014040' },
            }}
          >
            Xem bộ sưu tập Hồ Tĩnh Lặng
          </Button>
          <Box></Box>
          <Link
            href="#"
            sx={{
              mt: 2,
              display: 'inline-block',
              fontWeight: 500,
              color: 'rgb(66, 62, 49)',
              fontFamily: '"General Sans", sans-serif',
              textDecoration: 'none',
              position: 'relative',
              '&::after': {
                content: '"→"',
                position: 'absolute',
                right: -20,
                opacity: 0,
                transition: 'opacity 0.2s, right 0.2s',
              },
              '&:hover::after': {
                opacity: 1,
                right: -30,
              },
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            *Tìm hiểu về chính sách hoàn tiền
          </Link>
        </Box>
      </Grid>

      {/* Right Side - Image */}
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src="/img/hero_section.jpg"
          alt="Painting"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Grid>
    </Grid>
  );
}
