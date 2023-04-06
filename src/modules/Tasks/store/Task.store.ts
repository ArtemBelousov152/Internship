import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { PrivateFields } from './Task.store.types';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/Tasks.entity';
import { TaskAgentInstance } from 'http/agent';
import { TaskStatsCalc, FormatUrlParams, NormalizeTasks } from 'helpers/index';

class TaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _taskStats: observable,
      _tasks: observable,
      _isLoading: observable,

      tasks: computed,
      taskStats: computed,
      isLoading: computed,

      loadTasks: action.bound,
      delTask: action.bound,
      changeTaskComplete: action.bound,
      changeTaskIsImportant: action.bound,
    });
  }

  private _tasks: TaskEntity[] | null = null;

  private _taskStats: TasksStatsEntity | null = null;
  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  get taskStats(): TasksStatsEntity | null {
    return this._taskStats;
  }

  async loadTasks(searchParams?: SearchFormEntity) {
    this._isLoading = true;

    try {
      const result = searchParams
        ? await TaskAgentInstance.getTasks(FormatUrlParams(searchParams))
        : await TaskAgentInstance.getTasks();

      runInAction(() => {
        this._tasks = NormalizeTasks(result);
        this._taskStats = TaskStatsCalc(result);
      });
    } catch {
      runInAction(() => {
        this._tasks = null;
        this._taskStats = null;
      });
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  async delTask(id: TaskEntity['id']) {
    try {
      await TaskAgentInstance.deleteTask(id);
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      this._isLoading = false;
    }

    this.loadTasks();
  }

  async changeTaskComplete(id: TaskEntity['id'], prevStatus: boolean) {
    try {
      await TaskAgentInstance.patchTask(id, { isCompleted: !prevStatus });
      await TaskAgentInstance.patchTask(id, { isImportant: false });
    } catch (error) {
      console.log(error);

      throw error;
    }

    this.loadTasks();
  }

  async changeTaskIsImportant(id: TaskEntity['id'], prevStatus: boolean) {
    try {
      await TaskAgentInstance.patchTask(id, { isImportant: !prevStatus });
    } catch (error) {
      console.log(error);

      throw error;
    }

    this.loadTasks();
  }
}

export const TaskStoreInstanse = new TaskStore();
