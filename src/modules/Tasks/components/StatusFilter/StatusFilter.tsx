import React, { memo, MouseEvent } from 'react';
import { StatusFilterProps } from './StatusFilte.types';
import { StatusFilterTypes } from 'domains/index';
import { STATUS_FILTER_TYPES } from 'constants/index';

function StatusFilterComponent({ onChange, activeFilter, disabled }: StatusFilterProps) {
  const statusFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    if (!disabled) onChange(evt.target.textContent as StatusFilterTypes);
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
}

export const StatusFilter = memo(StatusFilterComponent);
