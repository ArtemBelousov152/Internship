import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Checkbox, FormControlLabel, Button, TextField, Stack, CircularProgress } from '@mui/material/';
import { AddTaskFormInstanse } from './store';
import { DEFAULT_VALUE, VALIDATION_SCHEMA } from './AddTaskForm.constants';
import { Error } from 'components/index';
import { NewTaskEntity } from 'domains/index';
import { PATH_LIST } from 'constants/index';

function AddTaskFormComponent() {
  const navigate = useNavigate();

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const onNameTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue('name', event.target.value);

  const onInfoTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue('info', event.target.value);

  const onTaskIsImportant = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue('isImportant', event.target.checked);

  const onSubmit = (data: NewTaskEntity) => AddTaskFormInstanse.createTask(data).then(() => navigate(PATH_LIST.ROOT));

  if (AddTaskFormInstanse.isError) {
    return <Error />;
  }

  if (AddTaskFormInstanse.isLoading) {
    return (
      <Stack direction="row" justifyContent="center" margin="3rem 0 3rem 0" width="100%">
        <CircularProgress color="inherit" size={100} />
      </Stack>
    );
  }

  return (
    <Stack component="form" direction="column" spacing={4} marginTop={3} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="Name"
            placeholder="Enter a task name"
            value={field.value}
            onChange={onNameTaskChange}
            helperText={error?.message}
            error={Boolean(error?.message)}
          />
        )}
      />

      <Controller
        control={control}
        name="info"
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="Description"
            placeholder="Enter a description of the task"
            value={field.value}
            onChange={onInfoTaskChange}
            helperText={error?.message}
            error={Boolean(error?.message)}
          />
        )}
      />

      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                style={{ padding: '0 5px 0 0' }}
                checked={field.value}
                onChange={onTaskIsImportant}
              />
            }
            label="Important"></FormControlLabel>
        )}
      />

      <Button variant="contained" type="submit" color="inherit">
        Add Task
      </Button>
    </Stack>
  );
}

export const AddTaskForm = observer(AddTaskFormComponent);
