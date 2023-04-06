import { action, makeObservable } from 'mobx';
import { NewTaskEntity } from 'domains/Tasks.entity';
import { TaskAgentInstance } from 'http/agent';

class AddTaskFormStore {
  constructor() {
    makeObservable(this, {
      createTask: action.bound,
    });
  }

  async createTask(newTask: NewTaskEntity) {
    try {
      await TaskAgentInstance.postTask(newTask);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}

export const AddTaskFormInstanse = new AddTaskFormStore();
