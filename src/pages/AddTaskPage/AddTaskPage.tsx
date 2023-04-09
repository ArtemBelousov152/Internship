import React from 'react';
import { PageContainer, Title } from 'components/index';
import { AddTaskForm } from 'modules/index';

export const AddTaskPage = () => {
  return (
    <PageContainer className="addTaskPage">
      <Title>Todo list | Add Todo</Title>
      <AddTaskForm />
    </PageContainer>
  );
};
