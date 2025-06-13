import { Grid, Typography, Box, Stack } from '@mui/material';
import { TEXT } from '../Home/const';
import { ButtonLogo, LinkText } from '@/components/layout';
import { Chat, FacebookOutlined, Instagram, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <Box sx={{ px: 40, backgroundColor: '#092933', paddingTop: '50px', paddingBottom: '70px', color: '#fff' }}>
      <Grid container>
        <Grid container sx={{ borderBottom: '1px solid #ddd', paddingBottom: '40px', marginBottom: '30px' }}>
          <Grid item xs={12} sm={6}>
            <ButtonLogo color="white" hoverColor="#ffffffc3">
              {'KULISG'}
            </ButtonLogo>
            <Typography variant="body2" fontSize="14px" maxWidth="490px">
              {TEXT.INTRODUCE}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Stack>
              <LinkText to="/faq">FAQ</LinkText>
              <LinkText to="/terms">Điêu khoản dịch vụ</LinkText>
              <LinkText to="/contact">Liên hệ</LinkText>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Stack>
              <LinkText to="/terms">Hình thức thanh toán</LinkText>
              <LinkText to="/faq">Quá trình đặt hàng</LinkText>
              <LinkText to="/contact">Hướng dân mua hàng online</LinkText>
            </Stack>
          </Grid>
        </Grid>

        <Grid container sx={{ borderBottom: '1px solid #ddd', paddingBottom: '40px', marginBottom: '30px' }}>
          {/* Cột Gọi Mua Hàng */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" fontFamily='"General Sans", sans-serif' fontWeight="500" fontSize="14px">
              GỌI MUA HÀNG ONLINE (08:00 - 21:00)
            </Typography>
            <Typography lineHeight="50px" fontSize="25px">
              {TEXT.HOTLINE}
            </Typography>
            <Typography fontSize="13px">{TEXT.TIME_WORK}</Typography>

            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              marginTop="35px"
            >
              GÓP Ý & KHIẾU NẠI (08:00 - 21:00)
            </Typography>
            <Typography lineHeight="50px" fontSize="25px">
              {TEXT.HOTLINE}
            </Typography>
            <Typography fontSize="13px">{TEXT.TIME_WORK}</Typography>
          </Grid>

          {/* Cột Hệ Thống Showroom */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" fontFamily='"General Sans", sans-serif' fontWeight="500" fontSize="14px">
              HỆ THÔNG SHOWROOM
            </Typography>
            <img src="/img/showroom.png" alt="Showroom" style={{ width: '90%', height: '90%', marginTop: '10px' }} />
          </Grid>

          {/* Cột Fanpage */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" fontFamily='"General Sans", sans-serif' fontWeight="500" fontSize="14px">
              GÓC NGHỆ THUẬT
            </Typography>
            <img src="/img/fanpage.jpg" alt="Fanpage" style={{ width: '90%', height: '90%', marginTop: '10px' }} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              textTransform="uppercase"
              marginBottom="30px"
            >
              điện thoại
            </Typography>
            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              textTransform="uppercase"
            >
              {TEXT.HOTLINE}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              textTransform="uppercase"
              marginBottom="30px"
            >
              e-mail
            </Typography>
            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              textTransform="lowercase"
            >
              {TEXT.EMAIL}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              textTransform="uppercase"
              marginBottom="26px"
            >
              mạng xã hội
            </Typography>
            <Stack direction="row" spacing={1}>
              <FacebookOutlined sx={{ fontSize: '24px', cursor: 'pointer' }} />
              <Instagram sx={{ fontSize: '24px', cursor: 'pointer' }} />
              <Twitter sx={{ fontSize: '24px', cursor: 'pointer' }} />
              <Chat sx={{ fontSize: '24px', cursor: 'pointer' }} />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              textTransform="uppercase"
              marginBottom="30px"
            >
              Copyright
            </Typography>
            <Typography
              variant="h4"
              fontFamily='"General Sans", sans-serif'
              fontWeight="500"
              fontSize="14px"
              textTransform="uppercase"
            >
              © 2025 KULISG
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
