import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { delay } from 'helpers/delay';
import { TaskEntity } from 'domains/Tasks.entity';

// class EditTaskStore {
//   constructor() {
//     makeObservable(this, {
//       _task: observable,
//       _isLoading: observable,

//       task: computed,
//       isLoading: computed,

//       loadTask: action,
//       sendTask: action,
//     });
//   }

//   private _task: TaskEntity;

//   async loadTask(id: TaskEntity['id']) {
//     delay(1000);
//   }

//   async sendTask(id: TaskEntity['id']) {
//     delay(1000);
//   }
// }

// export const EditTaskStoreInstanse = new EditTaskStore();
