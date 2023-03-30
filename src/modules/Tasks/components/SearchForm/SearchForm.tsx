import React, { MouseEvent, useState, useCallback, memo } from 'react';
import { StatusFilter } from '../StatusFilter';
import { TaskStoreInstanse } from '../../store';
import { SearchInput } from 'components/SearchInput';
import './SearchForm.css';
import { StatusFilterTypes } from 'domains/Tasks.entity';

const SearchFormComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilterValue, setStatusFilterValue] = useState<StatusFilterTypes>('All');

  const { loadData } = TaskStoreInstanse;

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const searchInputReset = () => {
    setSearchValue('');
  };

  const onFilterTypeChange = useCallback(
    () => (value: StatusFilterTypes) => {
      setStatusFilterValue(value);
    },
    [setStatusFilterValue]
  );

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchValue('');
    loadData({
      searchValue,
      statusFilterValue,
    });
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <SearchInput onChange={onSearchInputChange} value={searchValue} onReset={searchInputReset} />
      <StatusFilter onChange={onFilterTypeChange} activeFilter={statusFilterValue} />
      <button onClick={onSubmit} className="btn btn-primary">
        Find
      </button>
    </form>
  );
};

export const SearchForm = memo(SearchFormComponent);
