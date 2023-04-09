import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Router } from 'router/index';

export const App = () => {
  return (
    <CssBaseline>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CssBaseline>
  );
};
