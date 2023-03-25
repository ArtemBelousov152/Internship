import React from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from 'components/PageContainer';
import { EditTaskForm } from 'modules/EditTaskForm';
import { Title } from 'components/Title';

export const EditTaskPage = () => {
  const { taskId } = useParams();

  return (
    <PageContainer className="addTaskPage">
      <Title>Todo list | Edit Task {taskId}</Title>
      <EditTaskForm />
    </PageContainer>
  );
};
