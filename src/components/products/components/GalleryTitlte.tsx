import { Typography } from '@mui/material';
import { FunctionComponent } from 'react';

interface Props {
  content: string;
}

const GalleryTitle: FunctionComponent<Props> = ({ content }) => {
  return (
    <Typography
      variant="h4"
      gutterBottom
      style={{
        fontFamily: '"Orpheus Pro", serif',
        fontWeight: 400,
        fontSize: '2.1rem',
        color: '#423E31',
        textAlign: 'center',
        // textTransform: 'uppercase',
      }}
    >
      {content}
    </Typography>
  );
};

export default GalleryTitle;
