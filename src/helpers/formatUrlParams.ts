import { SearchFormEntity } from 'domains/Tasks.entity';
import { GetAllTasksQuery } from 'http/model';
import { STATUS_FILTER_TYPES } from 'constants/statusFiltersTypes';

export const FormatUrlParams = (formValue: SearchFormEntity): GetAllTasksQuery | undefined => {
  const { searchValue, statusFilterValue } = formValue;

  const formatParams: GetAllTasksQuery = {};

  if (searchValue !== '') {
    formatParams.name_like = searchValue;
  }

  switch (statusFilterValue) {
    case STATUS_FILTER_TYPES.ALL: {
      break;
    }
    case STATUS_FILTER_TYPES.ACTIVE: {
      formatParams.isCompleted = false;
      break;
    }
    case STATUS_FILTER_TYPES.DONE: {
      formatParams.isCompleted = true;
      break;
    }
    case STATUS_FILTER_TYPES.IMPORTANT: {
      formatParams.isImportant = true;
      break;
    }
  }

  return formatParams;
};
