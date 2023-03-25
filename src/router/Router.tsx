import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TaskPage } from 'pages/TaskPage';
import { PATH_LIST } from 'constants/paths';
import { EditTaskPage } from 'pages/EditTaskPage';
import { AddTaskPage } from 'pages/AddTaskPage';

export const Router = () => {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TaskPage />} />
      <Route path={PATH_LIST.EDIT} element={<EditTaskPage />} />
      <Route path={PATH_LIST.ADD} element={<AddTaskPage />} />
    </Routes>
  );
};
