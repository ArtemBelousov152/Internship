import React, { useState, MouseEvent, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { EditTaskFormDefaultValues } from './EditTaskForm.constants';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { TasksMock } from '__mocks__/Tasks.mock';
import { EditTaskEntity, TaskEntity } from 'domains/Tasks.entity';
import { ROOT } from 'constants/paths';

export const EditTaskFormComponent = () => {
  const { control, setValue, handleSubmit } = useForm<EditTaskEntity>({
    defaultValues: EditTaskFormDefaultValues,
  });
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { info, isDone, isImportant, name } = TasksMock.find((task) => task.id === taskId) as TaskEntity;
  const [taskName, setTaskName] = useState(name);
  const [taskInfo, setTaskInfo] = useState(info);
  const [taskImportant, setTaskImportant] = useState(isImportant);
  const [taskCompleted, setTaskCompleted] = useState(isDone);

  const onNameTaskChange = (value: string) => {
    setTaskName(value);
  };

  const onInfoTaskChange = (value: string) => {
    setTaskInfo(value);
  };

  const onTaskIsImportant = (value: boolean) => {
    setTaskImportant(value);
  };

  const onTaskIsCompleted = (value: boolean) => {
    setTaskCompleted(value);
    if (taskImportant) {
      setTaskImportant(false);
    }
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log(
      `Название задачи: ${taskName} \n
       Информация о задаче: ${taskInfo} \n
       Важная задача: ${taskImportant} \n
       Задача выполнена: ${taskCompleted}`
    );
    navigate(ROOT);
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
      <Checkbox label="Important" checked={taskImportant} onChange={onTaskIsImportant} disabled={taskCompleted} />
      <Checkbox label="Completed" checked={taskCompleted} onChange={onTaskIsCompleted} />
      <button type="submit" onClick={onSubmit} className="btn btn-secondary d-block ml-auto w-100">
        Edit Task
      </button>
    </form>
  );
};

export const EditTaskForm = memo(EditTaskFormComponent);
