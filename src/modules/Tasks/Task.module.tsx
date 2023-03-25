import React from 'react';
import { SearchForm, TaskList, TaskStats } from './components';
import { TasksMock, TasksStatsMock } from '__mocks__/Tasks.mock';

export const Tasks = () => {
  return (
    <>
      <SearchForm />
      <TaskStats {...TasksStatsMock} />
      <TaskList tasks={TasksMock} />
    </>
  );
};
