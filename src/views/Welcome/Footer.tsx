import React from 'react';
import { Grid, Typography, Box, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer = () => {
    return (
        <Box padding="70px" >
            <Divider sx={{ marginBottom: 5 }} />
            <Grid container spacing={4}>
                {/* Cột Gọi Mua Hàng */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h4" fontFamily="inherit" fontWeight="500" fontSize='15px'>
                        GỌI MUA HÀNG ONLINE (08:00 - 21:00 mỗi ngày)
                    </Typography>
                    <Typography lineHeight='50px' fontSize='25px' >
                        1800 1162
                    </Typography>
                    <Typography fontSize='13px'>
                        Tất cả các ngày trong tuần (Trừ tết Âm Lịch)
                    </Typography>

                    <Typography variant="h4" fontFamily="inherit" fontWeight="500" fontSize='15px' marginTop="35px">
                        GÓP Ý & KHIẾU NẠI (08:30 - 20:30)
                    </Typography>
                    <Typography lineHeight='50px' fontSize='25px' >
                        1800 1160
                    </Typography>
                    <Typography fontSize='13px'>
                        Tất cả các ngày trong tuần (Trừ tết Âm Lịch)
                    </Typography>
                </Grid>

                {/* Cột Hệ Thống Showroom */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h4" fontFamily="inherit" fontWeight="500" fontSize='15px'  >
                        HỆ THỐNG SHOWROOM
                    </Typography>
                    <img
                        src="img/showroom.png"
                        alt="Showroom"
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                    {/* <Link href="#" underline="hover" color="inherit">
                        Xem địa chỉ hệ thống 54 showroom
                    </Link> */}
                </Grid>

                {/* Cột Fanpage */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h4" fontFamily="inherit" fontWeight="500" fontSize='15px'>
                        FANPAGE CỦA CHÚNG TÔI
                    </Typography>
                    <img
                        src="img/fanpage.webp"
                        alt="Fanpage"
                        style={{ width: '100%', marginTop: '10px' }}
                    />
                    <Box display="flex" justifyContent="flex-start" marginTop="10px">
                        <FacebookIcon sx={{
                            marginRight: '10px', '&:hover': {
                                transform: 'scale(1.04)',
                                color: '#3B5998',
                            },
                        }} />
                        <InstagramIcon sx={{
                            margin: "0 10px", '&:hover': {
                                transform: 'scale(1.04)',
                                color: '#CD486B',
                            },
                        }} />
                        <YouTubeIcon sx={{
                            margin: "0 10px", '&:hover': {
                                transform: 'scale(1.04)',
                                color: '#E50914',
                            },
                        }} />
                        <TwitterIcon sx={{
                            margin: "0 10px", '&:hover': {
                                transform: 'scale(1.04)',
                                color: '#1DA1F2',
                            },
                        }} />
                    </Box>
                </Grid>
            </Grid>

            {/* Phần cuối */}
            <Box textAlign="center" marginTop="35px" borderTop="1px solid #ddd" paddingTop="10px">
                <Typography variant="body2" color="textSecondary">
                    © Công ty Cổ phần Kuli Sài Gòn
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Powered by KuliSG
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;
