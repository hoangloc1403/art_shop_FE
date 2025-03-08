import { Typography } from '@mui/material';

interface ProductGalleryTitleProps {
  content: string;
}

const ProductGalleryTitle = ({ content }: ProductGalleryTitleProps) => {
  return (
    <Typography
      variant="h4"
      gutterBottom
      style={{
        color: '#4A90E2',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        textTransform: 'uppercase',
      }}
    >
      {content}
    </Typography>
  );
};

export default ProductGalleryTitle;
