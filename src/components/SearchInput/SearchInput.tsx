import React, { ChangeEventHandler, MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import { SearchInputProps } from './SearchInput.types';

export function SearchInput({ onChange, value, onReset, disabled }: SearchInputProps) {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <FormControl size="small" variant="outlined" disabled={disabled}>
      <InputLabel htmlFor="outlined">Search</InputLabel>
      <OutlinedInput
        id="outlined"
        onChange={onSearchInputChange}
        value={value}
        label="Search"
        endAdornment={
          <InputAdornment position="end">
            <IconButton color="inherit" size="small" disabled={disabled} onClick={onResetBtnClick} aria-label="reset">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
