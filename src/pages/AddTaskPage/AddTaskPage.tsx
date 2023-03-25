import React from 'react';
import { PageContainer } from 'components/PageContainer';
import { AddTaskForm } from 'modules/AddTaskForm';
import { Title } from 'components/Title';

export const AddTaskPage = () => {
  return (
    <PageContainer className="addTaskPage">
      <Title>Todo list | Add Todo</Title>
      <AddTaskForm />
    </PageContainer>
  );
};
