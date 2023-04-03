import { action, computed, makeObservable, observable, runInAction, reaction } from 'mobx';
import { PrivateFields } from './EditTask.store.types';
import { EditTaskEntity, TaskEntity } from 'domains/Tasks.entity';
import { taskAgent } from 'http/agent';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _isLoading: observable,
      _id: observable,

      task: computed,
      isLoading: computed,
      id: computed,

      loadTask: action.bound,
      sendTask: action.bound,
      setId: action.bound,
    });
    reaction(
      () => this._id,
      () => (this._id !== 0 ? this.loadTask(this._id) : null)
    );
  }

  private _task: TaskEntity = {
    id: 0,
    name: '',
    info: '',
    isCompleted: false,
    isImportant: false,
  };

  get task(): TaskEntity {
    return this._task;
  }

  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  private _id = 0;

  get id(): number {
    return this._id;
  }

  async loadTask(id: TaskEntity['id']) {
    this._isLoading = true;

    try {
      const res = await taskAgent.getTasksById(id);

      runInAction(() => {
        this._task = res;
      });
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async sendTask(id: TaskEntity['id'], newTask: EditTaskEntity) {
    this._isLoading = true;

    try {
      await taskAgent.patchTask(id, newTask);
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  setId(id: TaskEntity['id']) {
    this._id = id;
  }
}

export const EditTaskStoreInstanse = new EditTaskStore();
