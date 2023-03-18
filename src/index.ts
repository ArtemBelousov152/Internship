interface TaskResponse {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
  id: number;
}

type TaskPost = Omit<TaskResponse, 'id' | 'isCompleted'>;

type TaskPatch = Partial<Omit<TaskResponse, 'id'>>;

interface GetParams extends Partial<Pick<TaskResponse, 'isCompleted' | 'isImportant'>> {
  name_like?: string;
}

class BaseAgent {
  constructor(private _baseUrl: string) {}

  protected fetch = async <T>(url: string, config?: RequestInit): Promise<T> | never => {
    const finalUrl = `${this._baseUrl}${url}`;

    const res = await fetch(finalUrl, config);

    if (!res.ok) {
      throw new Error(`Coult not fetch ${finalUrl}, status ${res.status}`);
    }

    const data = (await res.json()) as T;

    return data;
  };
}

class FormatString {
  // Получает объект с параметрами запроса и превращает их в строку
  setParams = (object?: GetParams): string => {
    if (object) {
      const paramsArray: string[] = [];
      let key: keyof GetParams;

      for (key in object) {
        paramsArray.push(`${key}=${object[key]}`);
      }

      return `?${paramsArray.join('&')}`;
    }

    return '';
  };
}

class TasksAgent extends BaseAgent {
  private formatter = new FormatString();

  constructor() {
    super('https://intership-liga.ru');
  }

  getTasks = async (params?: GetParams): Promise<TaskResponse[] | null> => {
    try {
      const tasks = await this.fetch<TaskResponse[]>(`/tasks${this.formatter.setParams(params)}`);

      console.log('Все задачи получены', tasks);

      return tasks;
    } catch (error) {
      console.log(error.message);

      return null;
    }
  };

  getTasksById = async (id: number): Promise<TaskResponse | null> => {
    try {
      const task = await this.fetch<TaskResponse>(`/tasks/${id}`);

      console.log(`Получена задача по id: ${id}`, task);

      return task;
    } catch (error) {
      console.log(error.message);

      return null;
    }
  };

  postTask = async (task: TaskPost): Promise<TaskResponse | null> => {
    try {
      const res = await this.fetch<TaskResponse>(`/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(`Задача отправлена`, res);

      return res;
    } catch (error) {
      console.log(error.message);

      return null;
    }
  };

  patchTask = async (id: number, task: TaskPatch): Promise<TaskResponse | null> => {
    try {
      const res = await this.fetch<TaskResponse>(`/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(`Задача изменена`, res);

      return res;
    } catch (error) {
      console.log(error.message);

      return null;
    }
  };

  deleteTask = async (id: number): Promise<Record<string, never> | null> => {
    try {
      const res = await this.fetch<Record<string, never>>(`/tasks/${id}`, {
        method: 'DELETE',
      });

      console.log(`Задача по id:${id} удалена`, res);

      return res;
    } catch (error) {
      console.log(error.message);

      return null;
    }
  };
}

const taskAgent = new TasksAgent();

taskAgent.getTasks();
taskAgent.getTasksById(999);
taskAgent.postTask({
  info: 'test',
  name: 'test-name',
  isImportant: true,
});
taskAgent.patchTask(999, { info: 'test2' });
taskAgent.deleteTask(700);
