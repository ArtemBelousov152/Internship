import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { StatusFilter } from '../StatusFilter';
import { TaskStoreInstanse } from '../../store';
import { DEFAULT_VALUE } from './SearchForm.constants';
import { SearchInput } from 'components/SearchInput';
import './SearchForm.css';
import { SearchFormEntity, StatusFilterTypes } from 'domains/Tasks.entity';

const SearchFormComponent = () => {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUE,
  });

  const onSearchInputChange = (value: string) => {
    setValue('searchValue', value);
  };

  const searchInputReset = () => {
    setValue('searchValue', '');
  };

  const onFilterTypeChange = useCallback(
    (value: StatusFilterTypes) => {
      setValue('statusFilterValue', value);
    },
    [setValue]
  );

  const onSubmit = (data: SearchFormEntity) => {
    TaskStoreInstanse.loadTasks(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-form d-flex justify-content-between">
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

      <button disabled={TaskStoreInstanse.isLoading} className="btn btn-primary">
        Find
      </button>
    </form>
  );
};

export const SearchForm = observer(SearchFormComponent);
