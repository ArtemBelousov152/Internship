import React, { MouseEvent, useCallback, memo } from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { StatusFilter } from '../StatusFilter';
import { TaskStoreInstanse } from '../../store';
import { DEFAULT_VALUE } from './SearchForm.constants';
import { SearchInput } from 'components/SearchInput';
import './SearchForm.css';
import { StatusFilterTypes } from 'domains/Tasks.entity';

const SearchFormComponent = () => {
  const { control, setValue, reset, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUE,
  });
  const { loadData, isLoading } = TaskStoreInstanse;

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

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSubmit((data) => {
      loadData(data);
    })();
    reset();
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput
            disabled={isLoading}
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
          <StatusFilter disabled={isLoading} onChange={onFilterTypeChange} activeFilter={field.value} />
        )}
      />

      <button disabled={isLoading} onClick={onSubmit} className="btn btn-primary">
        Find
      </button>
    </form>
  );
};

export const SearchForm = observer(SearchFormComponent);
