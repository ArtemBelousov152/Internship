import * as Yup from 'yup';
import { NewTaskEntity } from 'domains/index';

export const DEFAULT_VALUE: NewTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
};

export const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  info: Yup.string().required('Обязательное поле'),
});
