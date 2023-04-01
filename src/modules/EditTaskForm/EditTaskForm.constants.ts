import { EditTaskEntity } from 'domains/Tasks.entity';

export const EditTaskFormDefaultValues: EditTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};
