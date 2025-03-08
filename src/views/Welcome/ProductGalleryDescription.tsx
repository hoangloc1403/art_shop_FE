import { Typography } from '@mui/material';

interface ProductGalleryDescriptionProps {
  content: string;
}

const ProductGalleryDescription = ({ content }: ProductGalleryDescriptionProps) => {
  return (
    <Typography
      variant="subtitle1"
      color="textSecondary"
      gutterBottom
      style={{
        color: '#757575',
        fontStyle: 'italic',
        fontSize: '1.1rem',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {content}
    </Typography>
  );
};

export default ProductGalleryDescription;
