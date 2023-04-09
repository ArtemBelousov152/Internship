import { StatusFilterTypes } from 'domains/index';

export interface StatusFilterProps {
  activeFilter: StatusFilterTypes;
  onChange: (data: StatusFilterTypes) => void;
  disabled: boolean;
}
