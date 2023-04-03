import * as Yup from 'yup';
import { EditTaskEntity } from 'domains/Tasks.entity';

export const DEFAULT_VALUES: EditTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
  isCompleted: false,
};

export const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  info: Yup.string().required('Обязательное поле'),
});
