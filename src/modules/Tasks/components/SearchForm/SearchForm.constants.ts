import { STATUS_FILTER_TYPES } from 'constants/index';
import { SearchFormEntity } from 'domains/index';

export const DEFAULT_VALUE: SearchFormEntity = {
  searchValue: '',
  statusFilterValue: STATUS_FILTER_TYPES.ALL,
};
