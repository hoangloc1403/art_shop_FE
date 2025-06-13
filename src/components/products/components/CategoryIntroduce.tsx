import { Box, Typography } from '@mui/material';
import { Category } from '@/types';

type Props = {
  category?: Category | null;
};

const CategoryIntroduce = ({ category }: Props) => {
  if (!category) return null;

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(253, 250, 241)',
        textAlign: 'center',
        py: 8,
        px: 2,
        mt: '64px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Orpheus Pro", serif',
          fontWeight: 400,
          fontSize: { xs: '16px', sm: '20px', md: '24px' },
          color: 'rgb(66, 62, 49)',
        }}
      >
        {category.name}
      </Typography>

      <Typography
        sx={{
          mt: 3,
          fontSize: '14px',
          fontWeight: 400,
          maxWidth: '600px',
          mx: 'auto',
          color: 'rgb(66, 62, 49)',
          fontFamily: '"General Sans", sans-serif',
        }}
      >
        {category.description || 'Không có mô tả cho danh mục này.'}
      </Typography>
    </Box>
  );
};

export default CategoryIntroduce;
