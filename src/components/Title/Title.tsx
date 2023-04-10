import React, { memo } from 'react';
import { Typography } from '@mui/material';
import { TitleProps } from './Title.types';

function TitleComponent({ children }: TitleProps) {
  return (
    <Typography component="h1" variant="h3" textTransform="uppercase" textAlign="center">
      {children}
    </Typography>
  );
}

export const Title = memo(TitleComponent);
