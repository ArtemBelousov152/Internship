import React, { MouseEvent, useState } from 'react';
import { StatusFilter } from '../StatusFilter';
import { SearchInput } from 'components/SearchInput';
import './SearchForm.css';
import { StatusFilterTypes } from 'domains/Tasks.entity';

export const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilterValue, setStatusFilterValue] = useState<StatusFilterTypes>('All');

  const onSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const searchInputReset = () => {
    setSearchValue('');
  };

  const onFilterTypeChange = (value: StatusFilterTypes) => {
    setStatusFilterValue(value);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSearchValue('');
    console.log(`Поиск по значению: ${searchValue} и фильтру ${statusFilterValue}`);
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
