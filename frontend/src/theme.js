import { createTheme } from '@mui/material/styles';

// Define the colors
const primaryColor = '#7bb620'; // Primary color
const secondaryColor = '#e73741'; // Secondary color
const infoColor = '#01a8df'; // Info color

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    info: {
      main: infoColor,
    },
    background: {
      default: '#fff', // Optional: Set a default background color
    },
    text: {
      primary: '#000', // Optional: Set a default text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Optional: Style overrides for buttons
        },
      },
    },
    // Add other component overrides here if needed
  },
});

export default theme;
