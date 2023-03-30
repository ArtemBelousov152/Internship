import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { PrivateFields } from './Task.store.types';
import { SearchFormEntity, TaskEntity, TasksStatsEntity } from 'domains/Tasks.entity';
import { TasksMock, TasksStatsMock } from '__mocks__/Tasks.mock';
import { delay } from 'helpers/delay';

class TaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _taskStats: observable,
      _tasks: observable,
      _isLoading: observable,

      tasks: computed,
      taskStats: computed,
      isLoading: computed,

      loadData: action,
      delTask: action,
      changeTaskComplete: action,
      changeTaskIsImportant: action,
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

  loadData = async (searchParams?: SearchFormEntity) => {
    this._isLoading = true;

    console.log('load');

    if (searchParams) {
      console.log(`найти задачу с названием ${searchParams.searchValue} и фильтром ${searchParams.statusFilterValue}`);
    }

    await delay(1000);

    runInAction(() => {
      this._tasks = TasksMock;
      this._taskStats = TasksStatsMock;
      this._isLoading = false;
    });
  };

  delTask = (id: TaskEntity['id']) => {
    console.log(`удалить заначу по id: ${id}`);

    this.loadData();
  };

  changeTaskComplete = (id: TaskEntity['id'], prevStatus: boolean) => {
    console.log(`Изменить значение complete задачи по id ${id} c ${prevStatus} на ${!prevStatus}`);

    this.loadData();
  };

  changeTaskIsImportant = (id: TaskEntity['id'], prevStatus: boolean) => {
    console.log(`Изменить значение important задачи по id ${id} c ${prevStatus} на ${!prevStatus}`);

    this.loadData();
  };
}

export const TaskStoreInstanse = new TaskStore();
