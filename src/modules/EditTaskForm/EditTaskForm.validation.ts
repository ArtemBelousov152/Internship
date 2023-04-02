import * as Yup from 'yup';

export const EditTaskFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  info: Yup.string().required('Обязательное поле'),
});
