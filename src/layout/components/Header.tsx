import * as React from 'react';
import { AppBar, Toolbar, IconButton, Stack } from '@mui/material';
import { Search, AccountCircle, ShoppingCart } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { topProduct } from '@/views/Home/mocData';
import { BUTTON_TEXT } from '@/views/Home/const';
import { useEventSwitchDarkMode } from '@/hooks';
import { AppIconButton } from '@/components';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
}));

const Header: React.FC = () => {
  const onSwitchDarkMode = useEventSwitchDarkMode();
  const [state] = useAppStore();
  const navigate = useNavigate();

  //   const DarkModeButton = (
  //     <AppIconButton
  //       icon={state.darkMode ? 'day' : 'night'} // Variant 1
  //       // icon="daynight" // Variant 2
  //       title={state.darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
  //       onClick={onSwitchDarkMode}
  //     />
  //   );

  return (
    <AppBar position="fixed" color="inherit" sx={{ boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'white' }}>
        <Button sx={{ color: 'red', fontWeight: 'bold', marginLeft: 5, fontSize: 25 }}>KULI</Button>
        <Stack direction="row" spacing={4} sx={{ flexGrow: 1, justifyContent: 'center' }}>
          <Button sx={{ color: 'black' }}>{BUTTON_TEXT.NEW_PRODUCT}</Button>
          <Button sx={{ color: 'black' }}>{BUTTON_TEXT.PRODUCT}</Button>
          <Button sx={{ color: 'red' }}>{BUTTON_TEXT.LOVE_SALE}</Button>
          <Button sx={{ color: 'red' }}>{BUTTON_TEXT.ART_SALE}</Button>
          <Button sx={{ color: 'black' }}>{BUTTON_TEXT.SHOWROOM}</Button>
        </Stack>

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

        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <ShoppingCart />
        </IconButton>

        <AppIconButton
          icon={state.darkMode ? 'day' : 'night'} // Variant 1
          // icon="daynight" // Variant 2
          title={state.darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
          onClick={onSwitchDarkMode}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
