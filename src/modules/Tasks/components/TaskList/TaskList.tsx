import React from 'react';
import { observer } from 'mobx-react';
import { Stack, Skeleton, Typography } from '@mui/material';
import { Task } from '../Task';
import { TaskStoreInstanse } from '../../store';
import { Error } from 'components/index';

function TaskListComponent() {
  if (TaskStoreInstanse.isError) {
    return <Error />;
  }

  if (TaskStoreInstanse.isLoading) {
    return (
      <Stack mt={2} mb={2} spacing={2}>
        <Skeleton height={100} variant="rounded" />
        <Skeleton height={100} variant="rounded" />
        <Skeleton height={100} variant="rounded" />
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
        <Typography component="h3" textAlign="center" mt={2} mb={2}>
          Задач не найдено
        </Typography>
      )}
    </>
  );
}

export const TaskList = observer(TaskListComponent);
