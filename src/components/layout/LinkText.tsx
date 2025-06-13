import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface LinkTextProps {
  to: string;
  children: React.ReactNode;
}

const LinkText = ({ to, children }: LinkTextProps) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', width: 'fit-content' }}>
      <Typography
        variant="h4"
        fontFamily='"General Sans", sans-serif'
        fontWeight={500}
        fontSize="14px"
        textTransform="capitalize"
        marginBottom="18px"
        sx={{
          color: 'white',
          display: 'inline-block',
          borderBottom: '1px solid transparent',
          transition: 'border-bottom 0.3s',
          '&:hover': {
            borderBottom: '1px solid white',
          },
          cursor: 'pointer',
        }}
      >
        {children}
      </Typography>
    </Link>
  );
};

export default LinkText;
