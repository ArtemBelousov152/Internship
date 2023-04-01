import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { delay } from 'helpers/delay';
import { TaskEntity } from 'domains/Tasks.entity';

// class EditTaskStore {
//   constructor() {
//     makeObservable(this, {
//       loadTask: computed,
//     });
//   }

//   loadTask(id: TaskEntity['id']) {}
// }
