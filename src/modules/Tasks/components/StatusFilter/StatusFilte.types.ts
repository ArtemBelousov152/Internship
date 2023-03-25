import { StatusFilterTypes } from 'domains/Tasks.entity';

export interface StatusFilterProps {
  activeFilter: StatusFilterTypes;
  onChange: (data: StatusFilterTypes) => void;
}
