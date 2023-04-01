import { STATUS_FILTER_TYPES } from 'constants/statusFiltersTypes';

export interface TaskEntity {
  name: string;
  info: string;
  id: string;
  isImportant: boolean;
  isDone: boolean;
}

export interface TasksStatsEntity {
  total: number;
  important: number;
  done: number;
}

export type NewTaskEntity = Omit<TaskEntity, 'isDone' | 'id'>;

export type EditTaskEntity = Omit<TaskEntity, 'id'>;

export type StatusFilterTypes = typeof STATUS_FILTER_TYPES[keyof typeof STATUS_FILTER_TYPES];

export interface SearchFormEntity {
  searchValue: string;
  statusFilterValue: StatusFilterTypes;
}
