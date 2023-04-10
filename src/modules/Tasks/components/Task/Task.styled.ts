import { styled, Card, Typography } from '@mui/material';
import { ElementType } from 'react';
import { TypographyProps } from './Task.types';

export const TaskCard = styled(Card)({
  width: '100%',
}) as typeof Card;

export const TaskTypography = styled(Typography)<TypographyProps & { component?: ElementType }>(({ completed }) => ({
  textDecoration: completed ? 'line-through' : 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
