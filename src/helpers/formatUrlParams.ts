import { SearchFormEntity } from 'domains/Tasks.entity';

// export const setParams = (object?: GetParams): string => {
//   console.log(object);
//   if (object) {
//     const paramsArray: string[] = [];
//     let key: keyof GetParams;

//     for (key in object) {
//       paramsArray.push(`${key}=${object[key]}`);
//     }

//     return `?${paramsArray.join('&')}`;
//   }

//   return '';
// };

export const setParams = (formValue?: SearchFormEntity): string => {
  if (!formValue) {
    return '';
  }
  const { searchValue, statusFilterValue } = formValue;
  const paramsArray: string[] = [];

  if (searchValue !== '') {
    paramsArray.push(`name_like=${searchValue}`);
  }

  switch (statusFilterValue) {
    case 'All': {
      break;
    }
    case 'Active': {
      paramsArray.push('isCompleted=false');
      break;
    }
    case 'Done': {
      paramsArray.push('isCompleted=true');
      break;
    }
    case 'Important': {
      paramsArray.push('isImportant=true');
      break;
    }
  }

  return `?${paramsArray.join('&')}`;
};
