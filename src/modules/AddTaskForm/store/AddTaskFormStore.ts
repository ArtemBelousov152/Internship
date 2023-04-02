import { action, makeObservable } from 'mobx';
import { NewTaskEntity } from 'domains/Tasks.entity';
import { taskAgent } from 'http/agent';

class AddTaskFormStore {
  constructor() {
    makeObservable(this, {
      createTask: action.bound,
    });
  }

  async createTask(newTask: NewTaskEntity) {
    try {
      await taskAgent.postTask(newTask);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

export const AddTaskFormInstanse = new AddTaskFormStore();
