import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TaskPage, EditTaskPage, AddTaskPage } from 'pages/index';
import { PATH_LIST } from 'constants/index';

export const Router = () => {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TaskPage />} />
      <Route path={PATH_LIST.EDIT} element={<EditTaskPage />} />
      <Route path={PATH_LIST.ADD} element={<AddTaskPage />} />
    </Routes>
  );
};
