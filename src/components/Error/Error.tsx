import React, { memo } from 'react';
import errorImg from 'assets/errorImg.webp';

export function ErrorComponent() {
  return <img className="mx-auto d-block" src={errorImg} alt="error" />;
}

export const Error = memo(ErrorComponent);
