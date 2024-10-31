import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

const products = [
    {
        src: '/img/Screenshot1.png',
        title: 'Túi Xách Nhỏ Bear Hug',
        price: '849,000₫',
    },
    {
        src: '/img/Screenshot1.png',
        title: 'Giày Cao Gót Quai Mary Jane',
        price: '549,000₫',
    },
    {
        src: '/img/Screenshot1.png',
        title: 'Balo Bear Hug',
        price: '899,000₫',
    },
    {
        src: '/img/Screenshot1.png',
        title: 'Túi Xách Nhỏ Trang Trí Khóa',
        price: '899,000₫',
    },
];

const ProductGallery = () => {
    return (
        <Box sx={{ padding: '40px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                HÀNG MỚI VỀ
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Các sản phẩm bắt nhịp quốc tế, nàng thời thượng không nên bỏ lỡ
            </Typography>
            <Grid container spacing={4} sx={{ marginTop: 5 }}>
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Button
                            onClick={() => console.log(`${product.title} được nhấn!`)}
                            sx={{
                                display: 'block',
                                width: '100%',
                                padding: 0,
                                textAlign: 'left',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={product.src}
                                alt={product.title}
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            />
                            <Box sx={{ padding: '16px' }}>
                                <Typography variant="body1" fontWeight="bold" color="black">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="textPrimary">
                                    {product.price}
                                </Typography>
                            </Box>
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="text"
                sx={{ marginTop: '30px', fontSize: '16px', color: 'black', fontFamily: 'inherit' }}
                onClick={() => console.log('Xem tất cả được nhấn!')}
            >
                XEM TẤT CẢ
            </Button>
        </Box>
    );
};

export default ProductGallery;
