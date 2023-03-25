import React from 'react';
import { TaskStatsProps } from './TaskStats.types';

export const TaskStats = ({ done, important, total }: TaskStatsProps) => {
  return (
    <div className="d-flex w-100 justify-content-between">
      <p>
        Total: <span className="badge bg-secondary">{total}</span>
      </p>
      <p>
        Important: <span className="badge bg-secondary">{important}</span>
      </p>
      <p>
        Done: <span className="badge bg-secondary">{done}</span>
      </p>
    </div>
  );
};
