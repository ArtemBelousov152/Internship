import React from 'react';
import { Error, PageContainer, Title } from 'components/index';

export function ErrorPage() {
  return (
    <PageContainer>
      <Title>Page not found 404</Title>
      <Error />
    </PageContainer>
  );
}
