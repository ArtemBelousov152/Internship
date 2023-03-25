import React from 'react';
import { TitleProps } from './Title.types';

export const Title = ({ children }: TitleProps) => {
  return <h1 style={{ textTransform: 'uppercase', textAlign: 'center' }}>{children}</h1>;
};
