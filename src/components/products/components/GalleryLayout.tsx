import { Box, Container } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const GalleryLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: 'rgb(236, 243, 249)', py: 8 }}>
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default GalleryLayout;
