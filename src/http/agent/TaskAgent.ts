import { BaseAgent } from './BaseAgent';
import { ROOT_URL } from 'constants/urls';
import { NewTaskEntity, SearchFormEntity, TaskEntity } from 'domains/Tasks.entity';
import { setParams } from 'helpers/index';

class TasksAgent extends BaseAgent {
  constructor() {
    super(ROOT_URL);
  }

  getTasks = async (params?: SearchFormEntity): Promise<TaskEntity[]> => {
    const tasks = await this.fetch<TaskEntity[]>(`/tasks${setParams(params)}`);

    console.log('Все задачи получены', tasks);

    return tasks;
  };

  getTasksById = async (id: number): Promise<TaskEntity> => {
    const task = await this.fetch<TaskEntity>(`/tasks/${id}`);

    console.log(`Получена задача по id: ${id}`, task);

    return task;
  };

  postTask = async (task: NewTaskEntity): Promise<TaskEntity> => {
    const res = await this.fetch<TaskEntity>(`/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Задача отправлена`, res);

    return res;
  };

  patchTask = async (id: number, task: Partial<TaskEntity>): Promise<TaskEntity> => {
    const res = await this.fetch<TaskEntity>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Задача изменена`, res);

    return res;
  };

  deleteTask = async (id: number): Promise<Record<string, never>> => {
    const res = await this.fetch<Record<string, never>>(`/tasks/${id}`, {
      method: 'DELETE',
    });

    console.log(`Задача по id:${id} удалена`, res);

    return res;
  };
}

export const taskAgent = new TasksAgent();
