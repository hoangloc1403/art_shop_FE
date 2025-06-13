import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ButtonHeaderProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonHeader: React.FC<ButtonHeaderProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        color: '#423e31',
        fontFamily: '"General Sans", sans-serif',
        fontWeight: 500,
        transition: 'color 0.4s ease, border-color 0.4s ease',
        borderBottom: '1px solid transparent',
        borderRadius: 0,
        padding: 0,
        textTransform: 'capitalize',
        // lineHeight: 1,
        '&:hover': {
          borderBottomColor: '#423e31',
        },
        ...props.sx, // cho phép ghi đè style nếu cần
      }}
    >
      {children}
    </Button>
  );
};

export default ButtonHeader;
