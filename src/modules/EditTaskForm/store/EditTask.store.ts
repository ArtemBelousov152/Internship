import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { PrivateFields } from './EditTask.store.types';
import { EditTaskEntity, TaskEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';
import { NormalizeTask } from 'helpers/index';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _task: observable,
      _isLoading: observable,
      _id: observable,
      _isError: observable,

      task: computed,
      isLoading: computed,
      id: computed,

      getTask: action.bound,
      sendTask: action.bound,
      setId: action.bound,
    });
    reaction(
      () => this._id,
      () => (this._id ? this.getTask(this._id) : null)
    );
  }

  private _task: TaskEntity | null = null;
  private _isLoading = false;
  private _id: string | null = null;
  private _isError = false;

  get task(): TaskEntity | null {
    return this._task;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get id(): string | null {
    return this._id;
  }

  get isError(): boolean {
    return this._isError;
  }

  async getTask(id: TaskEntity['id']) {
    this._isLoading = true;
    this._isError = false;

    try {
      const res = await TaskAgentInstance.getTaskById(id);

      this._task = NormalizeTask(res);
    } catch (error) {
      this._isError = true;

      throw error;
    } finally {
      this._isLoading = false;
    }
  }

  async sendTask(id: TaskEntity['id'], newTask: EditTaskEntity) {
    this._isLoading = true;
    this._isError = false;

    try {
      await TaskAgentInstance.patchTask(id, newTask);
    } catch (error) {
      this._isError = true;

      throw error;
    } finally {
      this._isLoading = false;
    }
  }

  setId(id: TaskEntity['id'] | null) {
    this._id = id;
  }
}

export const EditTaskStoreInstanse = new EditTaskStore();
