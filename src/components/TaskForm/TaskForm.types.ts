import { MouseEvent } from 'react';
import { TaskEntity } from 'domains/Tasks.entity';

export interface TaskFormProps extends Partial<Omit<TaskEntity, 'id'>> {
  onNameTaskChange: (value: string) => void;
  onInfoTaskChange: (value: string) => void;
  onTaskIsImportant: (value: boolean) => void;
  onTaskIsCompleted?: (value: boolean) => void;
  onSubmit: (evt: MouseEvent<HTMLButtonElement>) => void;
}
