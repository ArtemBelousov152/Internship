import React, { memo } from 'react';
import { TitleProps } from './Title.types';

function TitleComponent({ children }: TitleProps) {
  return <h1 style={{ textTransform: 'uppercase', textAlign: 'center' }}>{children}</h1>;
}

export const Title = memo(TitleComponent);
