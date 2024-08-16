// components/NoResults.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const NoResults = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Typography variant="h5" color="textSecondary">
        D'oh! No results
      </Typography>
      <Typography variant="body1" color="textSecondary">
        It looks like we couldn't find anything that matches your search. Try adjusting your filters or searching for something else!
      </Typography>
    </Box>
  );
};

export default NoResults;
