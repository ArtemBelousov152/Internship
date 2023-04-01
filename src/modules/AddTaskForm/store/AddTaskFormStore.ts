import { action, makeObservable } from 'mobx';
import { NewTaskEntity } from 'domains/Tasks.entity';

class AddTaskFormStore {
  constructor() {
    makeObservable(this, {
      createTask: action.bound,
    });
  }

  createTask(newTask: NewTaskEntity) {
    console.log(newTask);
  }
}

export const AddTaskFormInstanse = new AddTaskFormStore();
