import React, { memo, MouseEvent } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { StatusFilterProps } from './StatusFilte.types';
import { StatusFilterTypes } from 'domains/index';
import { STATUS_FILTER_TYPES } from 'constants/index';

function StatusFilterComponent({ onChange, activeFilter, disabled }: StatusFilterProps) {
  const statusFilterChange = (evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }) => {
    if (!disabled) onChange(evt.target.textContent as StatusFilterTypes);
  };

  const setActive = (filterType: StatusFilterTypes) => {
    return activeFilter === filterType ? 'contained' : 'outlined';
  };

  return (
    <ButtonGroup color="info" onClick={statusFilterChange} disabled={disabled}>
      <Button type="button" variant={setActive(STATUS_FILTER_TYPES.ALL)} aria-label="all">
        All
      </Button>
      <Button type="button" variant={setActive(STATUS_FILTER_TYPES.ACTIVE)} aria-label="active">
        Active
      </Button>
      <Button type="button" variant={setActive(STATUS_FILTER_TYPES.DONE)} aria-label="done">
        Done
      </Button>
      <Button type="button" variant={setActive(STATUS_FILTER_TYPES.IMPORTANT)} aria-label="important">
        Important
      </Button>
    </ButtonGroup>
  );
}

export const StatusFilter = memo(StatusFilterComponent);
