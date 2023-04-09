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
    <ButtonGroup onClick={statusFilterChange}>
      <Button color="info" type="button" variant={setActive(STATUS_FILTER_TYPES.ALL)}>
        All
      </Button>
      <Button color="info" type="button" variant={setActive(STATUS_FILTER_TYPES.ACTIVE)}>
        Active
      </Button>
      <Button color="info" type="button" variant={setActive(STATUS_FILTER_TYPES.DONE)}>
        Done
      </Button>
      <Button color="info" type="button" variant={setActive(STATUS_FILTER_TYPES.IMPORTANT)}>
        Important
      </Button>
    </ButtonGroup>
  );
}

export const StatusFilter = memo(StatusFilterComponent);
