import { action, makeObservable, observable } from 'mobx';
import { PrivateFields } from './AddTaskFormStore.types';
import { NewTaskEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';

class AddTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isError: observable,
      _isLoading: observable,

      createTask: action.bound,
    });
  }

  private _isError = false;
  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get isError(): boolean {
    return this._isError;
  }

  async createTask(newTask: NewTaskEntity) {
    this._isLoading = true;
    this._isError = false;
    try {
      await TaskAgentInstance.postTask(newTask).then((task) =>
        TaskAgentInstance.patchTask(`${task.id}`, { isCompleted: false })
      );
    } catch (error) {
      this._isError = true;

      throw error;
    } finally {
      this._isLoading = false;
    }
  }
}

export const AddTaskFormInstanse = new AddTaskFormStore();
