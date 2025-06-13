import { Category } from '@/types';
import { navigateTo } from '@/utils';
import { Box, Button, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: Category;
  description: string;
}

const CategoryFeaturedGalleryItem: FunctionComponent<Props> = ({ item, description }) => {
  const navigate = useNavigate();
  const artworkTotalText = `${item.artworkCount} tác phẩm`;

  return (
    <Box
      sx={{
        backgroundColor: '#eef4fa',
        padding: 2,
        // textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        component="img"
        src={item.imageUrl}
        alt={item.name}
        sx={{
          width: '100%',
          height: '440px',
          objectFit: 'cover',
          borderRadius: 1,
          mb: 2,
        }}
      />

      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontFamily: '"Orpheus Pro", serif',
          color: '#423E31',
          fontWeight: 400,
          fontSize: '2.1rem',
          mb: 1,
        }}
      >
        {item.name}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: '#555',
          mb: 5,
          fontFamily: '"General Sans", sans-serif',
        }}
      >
        {/* {item.description || 'Khám phá những bức tranh tuyệt vời phù hợp với không gian của bạn.'} */}
        {description}
      </Typography>

      <Button
        variant="outlined"
        onClick={() => navigate(`/product?categoryIds=${item.id}`)}
        sx={{
          width: 'fit-content',
          mt: 'auto',
          fontFamily: '"General Sans", sans-serif',
          textTransform: 'none',
          fontWeight: 500,
          borderColor: '#423E31',
          color: '#423E31',
          transition: 'all 0.5s ease',
          '&:hover': {
            borderColor: '#092933',
            backgroundColor: '#092933',
            color: '#fff',
          },
        }}
      >
        Xem {item.name}
      </Button>
    </Box>
  );
};

export default CategoryFeaturedGalleryItem;
