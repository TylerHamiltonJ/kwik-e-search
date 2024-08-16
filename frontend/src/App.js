import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Adjust the import path as needed
import SearchInterface from './SearchInterface';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchInterface />
    </ThemeProvider>
  );
};

export default App;
