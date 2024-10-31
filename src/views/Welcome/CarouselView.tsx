import React from 'react';
import Carousel from 'react-material-ui-carousel';

const images = [
    {
        src: '  img/Screenshot 2024-10-31 152137.png',
        alt: 'Image 1'
    },
    {
        src: 'img/Screenshot 2024-10-31 153220.png',
        alt: 'Image 2'
    },
    {
        src: 'img/Screenshot 2024-10-31 153251.png',
        alt: 'Image 3'
    }
];

const ImageCarousel = () => {
    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden', marginTop: "-8px", }}>
            <Carousel
                indicators={false}
                navButtonsAlwaysVisible={true}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        style={{
                            width: '100%',
                            height: '100%',
                            // objectFit: 'cover'
                        }}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;

