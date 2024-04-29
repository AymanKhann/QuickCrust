import { createTheme } from '@mui/material/styles';

const typography = {
  fontFamily: 'Arial, sans-serif',
  h4: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#3f51b5', 
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#A020F0', // Primary color
    },
    secondary: {
      main: '#f50057', // Secondary color
    },
    background: {
      default: '#f4f6f8', // Background color
    },
  },
  typography: typography, 
});

export default theme;
