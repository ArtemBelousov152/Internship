import React, { MouseEvent } from 'react';
import { StatusFilterProps } from './StatusFilte.types';
import { StatusFilterTypes } from 'domains/Tasks.entity';
import { STATUS_FILTER_TYPES } from 'constants/statusFiltersTypes';

export const StatusFilter = ({ onChange, activeFilter }: StatusFilterProps) => {
  const statusFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    onChange(evt.target.textContent as StatusFilterTypes);
  };
  const setClass = (filterType: StatusFilterTypes) => {
    return activeFilter === filterType ? 'btn btn-info' : 'btn btn-outline-secondary';
  };
  return (
    <div className="btn-group" onClick={statusFilterChange}>
      <button type="button" className={setClass(STATUS_FILTER_TYPES.ALL)}>
        All
      </button>
      <button type="button" className={setClass(STATUS_FILTER_TYPES.ACTIVE)}>
        Active
      </button>
      <button type="button" className={setClass(STATUS_FILTER_TYPES.DONE)}>
        Done
      </button>
      <button type="button" className={setClass(STATUS_FILTER_TYPES.IMPORTANT)}>
        Important
      </button>
    </div>
  );
};
