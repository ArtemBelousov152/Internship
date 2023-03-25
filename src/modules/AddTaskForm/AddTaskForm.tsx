import React, { useState, MouseEvent } from 'react';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';

export const AddTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskInfo, setTaskInfo] = useState('');
  const [taskImportant, setTaskImportant] = useState(false);

  const onNameTaskChange = (value: string) => {
    setTaskName(value);
  };

  const onInfoTaskChange = (value: string) => {
    setTaskInfo(value);
  };

  const onTaskIsImportant = (value: boolean) => {
    setTaskImportant(value);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log(
      `Название задачи: ${taskName} \n
       Информация о задаче: ${taskInfo} \n
       Важная задача: ${taskImportant} \n`
    );
    setTaskName('');
    setTaskInfo('');
    setTaskImportant(false);
  };

  return (
    <form>
      <TextField label="TaskName" placeholder="Clean room" value={taskName} onChange={onNameTaskChange} />
      <TextField
        label="What to do(description)"
        placeholder="Clean my room"
        value={taskInfo}
        onChange={onInfoTaskChange}
      />
      <Checkbox label="Important" checked={taskImportant} onChange={onTaskIsImportant} />
      <button onClick={onSubmit} style={{ width: '100%' }} className="btn btn-secondary d-block ml-auto">
        Edit Task
      </button>
    </form>
  );
};
