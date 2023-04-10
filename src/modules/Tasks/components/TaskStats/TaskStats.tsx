/* eslint-disable no-constant-condition */
import React from 'react';
import { observer } from 'mobx-react';
import { Stack, Typography } from '@mui/material';
import { TaskStoreInstanse } from '../../store';
import { TaskSkeleton, TaskStatsCount } from './TaskStats.styled';

function TaskStatsComponent() {
  if (TaskStoreInstanse.isError) {
    return (
      <Typography variant="subtitle1" component="h3" color="error" textAlign="center" mt={2}>
        Произошла ошибка
      </Typography>
    );
  }

  return (
    <Stack direction="row" justifyContent="space-between" mt={2}>
      <Typography display="flex" component="p">
        Total:{' '}
        {TaskStoreInstanse.isLoading ? (
          <TaskSkeleton variant="circular" />
        ) : (
          <TaskStatsCount component="span">{TaskStoreInstanse.taskStats.total}</TaskStatsCount>
        )}
      </Typography>
      <Typography display="flex" component="p">
        Important:{' '}
        {TaskStoreInstanse.isLoading ? (
          <TaskSkeleton variant="circular" />
        ) : (
          <TaskStatsCount component="span">{TaskStoreInstanse.taskStats.important}</TaskStatsCount>
        )}
      </Typography>
      <Typography display="flex" component="p">
        Done:{' '}
        {TaskStoreInstanse.isLoading ? (
          <TaskSkeleton variant="circular" />
        ) : (
          <TaskStatsCount component="span">{TaskStoreInstanse.taskStats.done}</TaskStatsCount>
        )}
      </Typography>
    </Stack>
  );
}

export const TaskStats = observer(TaskStatsComponent);
