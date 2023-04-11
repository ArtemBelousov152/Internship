import React from 'react';
import { Box } from '@mui/material';
import { PageContainerProps } from './PageContainer.types';

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Box width={700} margin="2rem auto 2rem auto">
      {children}
    </Box>
  );
}
