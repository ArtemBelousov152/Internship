import React from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Stack } from '@mui/material';
import { StatusFilter } from '../StatusFilter';
import { TaskStoreInstanse } from '../../store';
import { DEFAULT_VALUE } from './SearchForm.constants';
import { SearchInput } from 'components/index';
import './SearchForm.css';
import { SearchFormEntity, StatusFilterTypes } from 'domains/index';

function SearchFormComponent() {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const onSearchInputChange = (value: string) => setValue('searchValue', value);

  const searchInputReset = () => setValue('searchValue', '');

  const onFilterTypeChange = (value: StatusFilterTypes) => setValue('statusFilterValue', value);

  const onSubmit = (data: SearchFormEntity) => TaskStoreInstanse.loadTasks(data);

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} direction="row" justifyContent="space-between" component="form">
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput
            disabled={TaskStoreInstanse.isLoading}
            onChange={onSearchInputChange}
            value={field.value}
            onReset={searchInputReset}
          />
        )}
      />

      <Controller
        control={control}
        name="statusFilterValue"
        render={({ field }) => (
          <StatusFilter
            disabled={TaskStoreInstanse.isLoading}
            onChange={onFilterTypeChange}
            activeFilter={field.value}
          />
        )}
      />

      <Button type="submit" disabled={TaskStoreInstanse.isLoading} variant="contained">
        Find
      </Button>
    </Stack>
  );
}

export const SearchForm = observer(SearchFormComponent);
