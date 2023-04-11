import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import { Checkbox, FormControlLabel, Button, TextField, Stack, CircularProgress } from '@mui/material';
import { DEFAULT_VALUES, VALIDATION_SCHEMA } from './EditTaskForm.constants';
import { EditTaskStoreInstanse } from './store';
import { Error } from 'components/index';
import { EditTaskEntity } from 'domains/index';
import { PATH_LIST } from 'constants/index';

function EditTaskFormComponent() {
  const { control, setValue, handleSubmit, getValues, reset, watch } = useForm<EditTaskEntity>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(VALIDATION_SCHEMA),
  });

  const { taskId } = useParams();
  const navigate = useNavigate();
  const isCompletedWatch = watch('isCompleted');

  useEffect(() => {
    if (taskId) {
      EditTaskStoreInstanse.setId(taskId);
    }

    return () => {
      EditTaskStoreInstanse.setId(null);
    };
  }, []);

  useEffect(() => {
    if (EditTaskStoreInstanse.task) {
      reset(EditTaskStoreInstanse.task);
    }
  }, [EditTaskStoreInstanse.task]);

  const onNameTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', event.target.value);
  };

  const onInfoTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('info', event.target.value);
  };

  const onTaskIsImportant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('isImportant', event.target.checked);
  };

  const onTaskIsCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('isCompleted', event.target.checked);

    if (getValues().isImportant) {
      setValue('isImportant', false);
    }
  };

  const onSubmit = (data: EditTaskEntity) => {
    if (EditTaskStoreInstanse.id) {
      EditTaskStoreInstanse.sendTask(EditTaskStoreInstanse.id, data).then(() => navigate(PATH_LIST.ROOT));
    }
  };

  if (EditTaskStoreInstanse.isError) {
    return <Error />;
  }

  if (EditTaskStoreInstanse.isLoading) {
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
            disabled={isCompletedWatch}
            control={<Checkbox color="success" checked={field.value} onChange={onTaskIsImportant} />}
            label="Important"></FormControlLabel>
        )}
      />

      <Controller
        control={control}
        name="isCompleted"
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox color="error" checked={field.value} onChange={onTaskIsCompleted} />}
            label="Complete"></FormControlLabel>
        )}
      />

      <Button variant="contained" color="inherit" type="submit">
        Edit Task
      </Button>
    </Stack>
  );
}

export const EditTaskForm = observer(EditTaskFormComponent);
