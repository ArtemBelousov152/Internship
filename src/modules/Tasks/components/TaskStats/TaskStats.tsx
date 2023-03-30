import React from 'react';
import { observer } from 'mobx-react';
import { TaskStoreInstanse } from '../../store';
import { Loader } from 'components/Loader';

export const TaskStatsComponent = () => {
  const { taskStats, isLoading } = TaskStoreInstanse;

  return (
    <div className="d-flex w-100 justify-content-between">
      <span className="mb-3">
        Total:{' '}
        <Loader isLoading={isLoading} variant="dot">
          <span className="badge bg-secondary">{taskStats.total}</span>
        </Loader>
      </span>
      <span className="mb-3">
        Important:{' '}
        <Loader isLoading={isLoading} variant="dot">
          <span className="badge bg-secondary">{taskStats.important}</span>
        </Loader>
      </span>
      <span className="mb-3">
        Done:{' '}
        <Loader isLoading={isLoading} variant="dot">
          <span className="badge bg-secondary">{taskStats.done}</span>
        </Loader>
      </span>
    </div>
  );
};

export const TaskStats = observer(TaskStatsComponent);
