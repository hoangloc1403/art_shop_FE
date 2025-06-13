import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { imagesCarousel } from '../Home/mocData';



const ImageCarousel = () => {
    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden', marginTop: "-8px" }}>
            <Carousel
                indicators={false}
                navButtonsAlwaysVisible={true}
            >
                {imagesCarousel.map((image, index) => (
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

