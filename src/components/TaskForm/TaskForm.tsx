import React from 'react';
import { TaskFormProps } from './TaskForm.types';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';

export const TaskForm = ({
  info,
  isDone,
  isImportant,
  name,
  onInfoTaskChange,
  onNameTaskChange,
  onTaskIsCompleted,
  onTaskIsImportant,
  onSubmit,
}: TaskFormProps) => {
  return (
    <form>
      <TextField label="TaskName" placeholder="Clean room" value={name} onChange={onNameTaskChange} />
      <TextField label="What to do(description)" placeholder="Clean my room" value={info} onChange={onInfoTaskChange} />
      <Checkbox label="Important" checked={isImportant} onChange={onTaskIsImportant} disabled={isDone} />
      {onTaskIsCompleted !== undefined && <Checkbox label="Completed" checked={isDone} onChange={onTaskIsCompleted} />}
      <button onClick={onSubmit} style={{ width: '100%' }} className="btn btn-secondary d-block ml-auto">
        Edit Task
      </button>
    </form>
  );
};
