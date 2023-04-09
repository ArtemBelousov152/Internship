import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFields } from './Task.store.types';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';
import { TaskStatsCalc, FormatUrlParams, NormalizeTasks } from 'helpers/index';
import { STATUS_FILTER_TYPES } from 'constants/statusFiltersTypes';

class TaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _taskStats: observable,
      _tasks: observable,
      _isLoading: observable,
      _isError: observable,
      _searchParams: observable,

      tasks: computed,
      taskStats: computed,
      isLoading: computed,

      getTasks: action.bound,
      loadTasks: action.bound,
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
  private _isError = false;
  private _searchParams: SearchFormEntity = {
    searchValue: '',
    statusFilterValue: STATUS_FILTER_TYPES.ALL,
  };

  get isLoading(): boolean {
    return this._isLoading;
  }

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  get taskStats(): TasksStatsEntity {
    return this._taskStats;
  }

  get isError(): boolean {
    return this._isError;
  }

  async getTasks(searchParams?: SearchFormEntity) {
    const result = searchParams
      ? await TaskAgentInstance.getTasks(FormatUrlParams(searchParams))
      : await TaskAgentInstance.getTasks();

    return {
      tasks: NormalizeTasks(result),
      taskStats: TaskStatsCalc(result),
    };
  }

  async loadTasks(searchParams?: SearchFormEntity) {
    this._isLoading = true;
    this._isError = false;

    try {
      if (searchParams) {
        this._searchParams = searchParams;
      }

      const { taskStats, tasks } = await this.getTasks(searchParams);

      this._tasks = tasks;
      this._taskStats = taskStats;
    } catch {
      this._isError = true;
    } finally {
      this._isLoading = false;
    }
  }

  async delTask(id: TaskEntity['id']) {
    this._isLoading = true;
    this._isError = false;

    try {
      await TaskAgentInstance.deleteTask(id);
      const { taskStats, tasks } = await this.getTasks(this._searchParams);

      this._tasks = tasks;
      this._taskStats = taskStats;
    } catch {
      this._isError = true;
    } finally {
      this._isLoading = false;
    }
  }

  async changeTaskComplete(id: TaskEntity['id'], prevStatus: boolean) {
    this._isLoading = true;
    this._isError = false;

    try {
      await TaskAgentInstance.patchTask(id, { isCompleted: !prevStatus });
      await TaskAgentInstance.patchTask(id, { isImportant: false });

      const { taskStats, tasks } = await this.getTasks(this._searchParams);

      this._tasks = tasks;
      this._taskStats = taskStats;
    } catch {
      this._isError = true;
    } finally {
      this._isLoading = false;
    }
  }

  async changeTaskIsImportant(id: TaskEntity['id'], prevStatus: boolean) {
    this._isLoading = true;
    this._isError = false;

    try {
      await TaskAgentInstance.patchTask(id, { isImportant: !prevStatus });
      const { taskStats, tasks } = await this.getTasks(this._searchParams);

      this._tasks = tasks;
      this._taskStats = taskStats;
    } catch {
      this._isError = true;
    } finally {
      this._isLoading = false;
    }
  }
}

export const TaskStoreInstanse = new TaskStore();
