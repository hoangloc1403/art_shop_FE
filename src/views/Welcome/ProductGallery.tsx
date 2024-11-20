
import { Box, Typography, Grid, Button } from '@mui/material';
import { imagesProducts } from '../Home/mocData';
import { BUTTON_TEXT } from '../Home/const';

const ProductGallery = () => {
    return (
        <Box sx={{ padding: '70px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                HÀNG MỚI VỀ
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Bộ sưu tập tranh nghệ thuật đẳng cấp, bắt nhịp xu hướng thế giới, dành riêng cho những người yêu nghệ thuật tranh vẽ.
            </Typography>
            <Grid container spacing={4} sx={{ marginTop: 5 }}>
                {imagesProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.04)',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                                },
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

                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Button
                variant="text"
                sx={{ marginTop: '30px', fontSize: '20px', color: 'black', fontFamily: 'inherit' }}
                onClick={() => console.log('Xem tất cả được nhấn!')}
            >
                {BUTTON_TEXT.ALL}
            </Button>
        </Box>
    );
};

export default ProductGallery;
