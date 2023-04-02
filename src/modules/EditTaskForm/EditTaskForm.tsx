import React, { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditTaskFormDefaultValues } from './EditTaskForm.constants';
import { EditTaskFormValidationSchema } from './EditTaskForm.validation';
// import { EditTaskStoreInstanse } from './store';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { EditTaskEntity } from 'domains/Tasks.entity';
import { ROOT } from 'constants/paths';

export const EditTaskFormComponent = () => {
  const { control, setValue, handleSubmit, getValues } = useForm<EditTaskEntity>({
    defaultValues: EditTaskFormDefaultValues,
    resolver: yupResolver(EditTaskFormValidationSchema),
  });
  // const { loadTask } = EditTaskStoreInstanse;
  const { taskId } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (taskId) {
  //     loadTask(taskId);
  //   }
  // });

  const onNameTaskChange = (value: string) => {
    setValue('name', value);
  };

  const onInfoTaskChange = (value: string) => {
    setValue('info', value);
  };

  const onTaskIsImportant = (value: boolean) => {
    setValue('isImportant', value);
  };

  const onTaskIsCompleted = (value: boolean) => {
    setValue('isCompleted', value);
    if (getValues().isImportant) {
      setValue('isImportant', false);
    }
  };

  const onSubmit = (data: EditTaskEntity) => {
    console.log(
      `Название задачи: ${data.name} \n
       Информация о задаче: ${data.info} \n
       Важная задача: ${data.isImportant} \n
       Задача выполнена: ${data.isCompleted}`
    );
    navigate(ROOT);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="TaskName"
            placeholder="Clean room"
            value={field.value}
            onChange={onNameTaskChange}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="info"
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="TaskName"
            placeholder="Clean room"
            value={field.value}
            onChange={onInfoTaskChange}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <Checkbox
            disabled={getValues().isCompleted}
            label="Important"
            checked={field.value}
            onChange={onTaskIsImportant}
          />
        )}
      />
      <Controller
        control={control}
        name="isCompleted"
        render={({ field }) => <Checkbox label="Complete" checked={field.value} onChange={onTaskIsCompleted} />}
      />
      <button type="submit" className="btn btn-secondary d-block ml-auto w-100">
        Edit Task
      </button>
    </form>
  );
};

export const EditTaskForm = memo(EditTaskFormComponent);
