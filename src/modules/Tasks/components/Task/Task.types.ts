import { TaskEntity } from 'domains/index';

export interface TaskProps {
  task: TaskEntity;
  onTaskComplete: (id: TaskEntity['id'], prevStatus: boolean) => void;
  onTaskIsImportant: (id: TaskEntity['id'], prevStatus: boolean) => void;
  onDelTask: (id: TaskEntity['id']) => void;
}
