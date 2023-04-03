import React, { memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { AddTaskFormInstanse } from './store';
import { DEFAULT_VALUE, VALIDATION_SCHEMA } from './AddTaskForm.constants';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { NewTaskEntity } from 'domains/Tasks.entity';
import { PATH_LIST } from 'constants/paths';

export const AddTaskFormComponent = () => {
  const navigate = useNavigate();

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const onNameTaskChange = (value: string) => {
    setValue('name', value);
  };

  const onInfoTaskChange = (value: string) => {
    setValue('info', value);
  };

  const onTaskIsImportant = (value: boolean) => {
    setValue('isImportant', value);
  };

  const onSubmit = (data: NewTaskEntity) => {
    AddTaskFormInstanse.createTask(data).then(() => navigate(PATH_LIST.ROOT));
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
        render={({ field }) => <Checkbox label="Important" checked={field.value} onChange={onTaskIsImportant} />}
      />
      <button type="submit" className="btn btn-secondary d-block ml-auto w-100">
        Add Task
      </button>
    </form>
  );
};

export const AddTaskForm = memo(AddTaskFormComponent);
