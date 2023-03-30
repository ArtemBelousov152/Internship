import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { SearchForm, TaskList, TaskStats } from './components';
import { TaskStoreInstanse } from './store';

export const TasksComponent = () => {
  const { loadData } = TaskStoreInstanse;

  useEffect(() => {
    loadData();
  });
  return (
    <>
      <SearchForm />
      <TaskStats />
      <TaskList />
    </>
  );
};

export const Tasks = observer(TasksComponent);
