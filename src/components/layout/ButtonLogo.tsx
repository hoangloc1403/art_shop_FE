import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface ButtonLogoProps {
  color?: string;
  hoverColor?: string;
  fontSize?: number;
  onClickRoute?: string;
  children: React.ReactNode;
}

const ButtonLogo: React.FC<ButtonLogoProps> = ({
  color = '#423e31',
  hoverColor = '#423e31cc',
  fontSize = 38,
  onClickRoute = '/home',
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      disableRipple
      sx={{
        color,
        fontWeight: 500,
        fontSize,
        fontFamily: '"Playfair Display", serif',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        padding: 0,
        minWidth: 'auto',
        backgroundColor: 'transparent',
        transition: 'color 0.3s ease',
        '&:hover': {
          color: hoverColor,
          backgroundColor: 'transparent',
        },
      }}
      onClick={() => navigate(onClickRoute)}
    >
      {children}
    </Button>
  );
};

export default ButtonLogo;
