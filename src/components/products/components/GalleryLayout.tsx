import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const GalleryLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Box sx={{ padding: '70px', textAlign: 'center' }}>{children}</Box>;
};

export default GalleryLayout;
