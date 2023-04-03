import React from 'react';
import { observer } from 'mobx-react';
import { TaskStoreInstanse } from '../../store';
import { Loader } from 'components/Loader';

export const TaskStatsComponent = () => {
  return (
    <div className="d-flex w-100 justify-content-between">
      <span className="mb-3">
        Total:{' '}
        <Loader isLoading={TaskStoreInstanse.isLoading} variant="dot">
          <span className="badge bg-secondary">{TaskStoreInstanse.taskStats.total}</span>
        </Loader>
      </span>
      <span className="mb-3">
        Important:{' '}
        <Loader isLoading={TaskStoreInstanse.isLoading} variant="dot">
          <span className="badge bg-secondary">{TaskStoreInstanse.taskStats.important}</span>
        </Loader>
      </span>
      <span className="mb-3">
        Done:{' '}
        <Loader isLoading={TaskStoreInstanse.isLoading} variant="dot">
          <span className="badge bg-secondary">{TaskStoreInstanse.taskStats.done}</span>
        </Loader>
      </span>
    </div>
  );
};

export const TaskStats = observer(TaskStatsComponent);
