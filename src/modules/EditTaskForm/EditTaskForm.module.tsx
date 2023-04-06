import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import { DEFAULT_VALUES, VALIDATION_SCHEMA } from './EditTaskForm.constants';
import { EditTaskStoreInstanse } from './store';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { EditTaskEntity } from 'domains/Tasks.entity';
import { PATH_LIST } from 'constants/paths';
import { Loader } from 'components/Loader';

export const EditTaskFormComponent = () => {
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
      EditTaskStoreInstanse.setId('0');
    };
  }, []);

  useEffect(() => {
    if (EditTaskStoreInstanse.task) {
      reset(EditTaskStoreInstanse.task);
    }
  }, [EditTaskStoreInstanse.task]);

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
    EditTaskStoreInstanse.sendTask(EditTaskStoreInstanse.id, data).then(() => navigate(PATH_LIST.ROOT));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Loader isLoading={EditTaskStoreInstanse.isLoading} variant="circle">
        {EditTaskStoreInstanse.task ? (
          <>
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
                  disabled={isCompletedWatch}
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
          </>
        ) : (
          <p>Задача не найдена</p>
        )}
      </Loader>
      <button type="submit" className="btn btn-secondary d-block ml-auto w-100">
        Edit Task
      </button>
    </form>
  );
};

export const EditTaskForm = observer(EditTaskFormComponent);
