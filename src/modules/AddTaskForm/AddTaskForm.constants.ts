import { NewTaskEntity } from 'domains/Tasks.entity';

export const AddTaskFormDefaultValues: NewTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
};
