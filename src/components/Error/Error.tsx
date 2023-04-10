import React, { memo } from 'react';
import { Box } from '@mui/system';
import errorImg from 'assets/errorImg.webp';

export function ErrorComponent() {
  return (
    <Box display="flex" justifyContent="center">
      <img src={errorImg} alt="error" />
    </Box>
  );
}

export const Error = memo(ErrorComponent);
