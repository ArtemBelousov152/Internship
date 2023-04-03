import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { PrivateFields } from './Task.store.types';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/Tasks.entity';
import { taskAgent } from 'http/agent';
import { TaskStatsCalc } from 'helpers/TaskStatcCalc';

class TaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _taskStats: observable,
      _tasks: observable,
      _isLoading: observable,

      tasks: computed,
      taskStats: computed,
      isLoading: computed,

      loadData: action.bound,
      delTask: action.bound,
      changeTaskComplete: action.bound,
      changeTaskIsImportant: action.bound,
    });
  }

  private _tasks: TaskEntity[] = [];

  private _taskStats: TasksStatsEntity = {
    done: 0,
    important: 0,
    total: 0,
  };
  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  get taskStats(): TasksStatsEntity {
    return this._taskStats;
  }

  async loadData(searchParams?: SearchFormEntity) {
    this._isLoading = true;

    try {
      const result = searchParams ? await taskAgent.getTasks(searchParams) : await taskAgent.getTasks();

      runInAction(() => {
        this._tasks = result;
        this._taskStats = TaskStatsCalc(result);
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

  async delTask(id: TaskEntity['id']) {
    try {
      await taskAgent.deleteTask(id);
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      this._isLoading = false;
    }

    this.loadData();
  }

  async changeTaskComplete(id: TaskEntity['id'], prevStatus: boolean) {
    try {
      await taskAgent.patchTask(id, { isCompleted: !prevStatus });
      await taskAgent.patchTask(id, { isImportant: false });
    } catch (error) {
      console.log(error);

      throw error;
    }

    this.loadData();
  }

  async changeTaskIsImportant(id: TaskEntity['id'], prevStatus: boolean) {
    try {
      await taskAgent.patchTask(id, { isImportant: !prevStatus });
    } catch (error) {
      console.log(error);

      throw error;
    }

    this.loadData();
  }
}

export const TaskStoreInstanse = new TaskStore();
