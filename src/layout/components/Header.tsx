import * as React from 'react';
import { AppBar, Toolbar, IconButton, Stack, Box } from '@mui/material';
import { Search, AccountCircle, ShoppingCart, Login, HowToReg } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { topProduct } from '@/views/Home/mocData';
import { BUTTON_TEXT } from '@/views/Home/const';
import { useUserRoleFromToken } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { ButtonHeader, HideOnScroll } from '@/components/layout';
import { TEXT } from './const';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userRole = useUserRoleFromToken();

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        color="inherit"
        sx={{ boxShadow: '0 12px 20px 4px #00000005', fontFamily: '"General Sans", sans-serif', px: 12 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'white', position: 'relative', pX: 0 }}>
          <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
            <ButtonHeader onClick={() => navigate('/')}>{BUTTON_TEXT.HOMEPAGE}</ButtonHeader>
            <ButtonHeader>{BUTTON_TEXT.SHOWROOM}</ButtonHeader>
            <ButtonHeader>{BUTTON_TEXT.CONTACT}</ButtonHeader>
            <ButtonHeader>{BUTTON_TEXT.ABOUTUS}</ButtonHeader>
          </Stack>

          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Button
              disableRipple
              sx={{
                color: '#423e31',
                fontWeight: 500,
                fontSize: 38,
                fontFamily: '"Playfair Display", serif',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                padding: 0,
                minWidth: 'auto',
                backgroundColor: 'transparent',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#423e31cc', // Màu khi hover
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => navigate('/')}
            >
              {TEXT.LOGO}
            </Button>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ marginRight: 2 }}>
            <SearchContainer>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={topProduct.map((option) => option.title)}
                filterOptions={(options, { inputValue }) => {
                  const filtered = options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()));

                  // If no options match, return the original filtered list with the custom message
                  return filtered.length > 0 ? filtered : ['Sản phẩm không có'];
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm"
                    variant="standard"
                    inputProps={{
                      ...params.inputProps,
                      type: 'search',
                    }}
                    sx={{
                      '& .MuiInputBase-root:hover': {
                        width: 190, // Ensure the input takes full width
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => {
                  // If the option is the no product message, render a non-interactive element
                  if (option === BUTTON_TEXT.NO_PRODUCT) {
                    return (
                      <li {...props} style={{ color: 'gray', pointerEvents: 'none' }}>
                        {option}
                      </li>
                    );
                  }
                  // Otherwise render the option as a list item
                  return <li {...props}>{option}</li>;
                }}
                sx={{
                  width: 180,
                  backgroundColor: 'white',
                  color: 'black',
                  marginBottom: 2,
                  '& .MuiInputBase-root:after': {
                    borderBottom: '2px solid black',
                  },
                }}
              />
            </SearchContainer>
            <IconButton color="inherit" sx={{ backgroundColor: 'white' }}>
              <Search sx={{ marginLeft: 1 }} />
            </IconButton>
          </Stack>

          {userRole === 3 && (
            <>
              <IconButton color="inherit" onClick={() => navigate('/profile')}>
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit" onClick={() => navigate('/cart')}>
                <ShoppingCart />
              </IconButton>
            </>
          )}

          {!userRole && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Login />}
                onClick={() => navigate('/sign_in')}
                sx={{
                  color: '#423e31',
                  borderColor: '#423e31',
                  '&:hover': {
                    backgroundColor: '#423e31',
                    color: 'white',
                    borderColor: '#423e31',
                  },
                }}
              >
                Đăng nhập
              </Button>

              <Button
                variant="contained"
                startIcon={<HowToReg />}
                onClick={() => navigate('/sign_up')}
                sx={{
                  backgroundColor: '#423e31',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#423e31cc',
                  },
                }}
              >
                Đăng ký
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
