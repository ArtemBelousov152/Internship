import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer, Title } from 'components/index';
import { EditTaskForm } from 'modules/index';

export const EditTaskPage = () => {
  const { taskId } = useParams();

  return (
    <PageContainer>
      <Title>Todo list | Edit Task №{taskId}</Title>
      <EditTaskForm />
    </PageContainer>
  );
};
