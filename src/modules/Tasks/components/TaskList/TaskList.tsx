import React from 'react';
import { observer } from 'mobx-react';
import { Stack, CircularProgress } from '@mui/material';
import { Task } from '../Task';
import { TaskStoreInstanse } from '../../store';
import { Error } from 'components/index';
import './Task.css';

function TaskListComponent() {
  if (TaskStoreInstanse.isError) {
    return <Error />;
  }

  if (TaskStoreInstanse.isLoading) {
    return (
      <Stack direction="row" justifyContent="center" margin="3rem 0 3rem 0" width="100%">
        <CircularProgress size={100} />
      </Stack>
    );
  }

  return (
    <>
      {TaskStoreInstanse.tasks.length ? (
        <Stack component="ul" direction="column" padding="0" spacing={2} mt={2}>
          {TaskStoreInstanse.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelTask={TaskStoreInstanse.delTask}
              onTaskComplete={TaskStoreInstanse.changeTaskComplete}
              onTaskIsImportant={TaskStoreInstanse.changeTaskIsImportant}
            />
          ))}
        </Stack>
      ) : (
        <p className="text-center d-block text-secondary">Задач не найдено</p>
      )}
    </>
  );
}

export const TaskList = observer(TaskListComponent);
