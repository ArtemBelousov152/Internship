import React from 'react';
import { observer } from 'mobx-react';
import { TaskStoreInstanse } from '../../store';
import { Loader } from 'components/index';

function TaskStatsComponent() {
  return (
    <div className="d-flex w-100 justify-content-between">
      {TaskStoreInstanse.isError ? (
        <p className="mx-auto d-block text-danger">Произошла ошибка</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export const TaskStats = observer(TaskStatsComponent);
