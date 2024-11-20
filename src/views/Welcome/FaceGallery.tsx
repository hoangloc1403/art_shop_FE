import React from 'react';
import { Grid, Card, CardMedia, Typography, Divider } from '@mui/material';

const FaceGallery = () => {
    const images = [
        { src: 'img/tranh-tinh-vat.jpg', alt: 'Image 1 description' },
        { src: 'img/tranh-truu-tuong.jpg', alt: 'Image 2 description' },
        { src: 'img/gui-cui-1-300x169.jpg', alt: 'Image 3 description' },
        { src: 'img/tranh-son-mai-300x458.jpg', alt: 'Image 4 description' },
    ];

    return (
        <div style={{ textAlign: 'center', padding: '70px' }}>
            <Divider textAlign="center" sx={{ fontWeight: 'bold', fontSize: 20 }}>
                FACEBOOK
            </Divider>
            <Typography variant="body1" gutterBottom sx={{ marginBottom: 5 }}>
                @kulisg.vn
            </Typography>
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="400"
                                image={image.src}
                                alt={image.alt}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default FaceGallery;
