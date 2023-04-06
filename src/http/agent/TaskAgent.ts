import { BaseAgent } from './BaseAgent';
import {
  GetAllTasksQuery,
  GetAllTasksResponse,
  GetTaskResponse,
  PatchTaskRequest,
  PatchTaskResponse,
  PostTaskRequest,
  PostTaskResponse,
} from 'http/model';

class TasksAgent extends BaseAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  getTasks = async (params?: GetAllTasksQuery): Promise<GetAllTasksResponse> => {
    const { data } = await this._http.get<GetAllTasksResponse>('/tasks', { params });

    return data;
  };

  getTaskById = async (id: string): Promise<GetTaskResponse> => {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${id}`);

    return data;
  };

  postTask = async (task: PostTaskRequest): Promise<PostTaskResponse> => {
    const { data } = await this._http.post<PostTaskResponse>('/tasks', task);

    return data;
  };

  patchTask = async (id: string, task: PatchTaskRequest): Promise<PatchTaskResponse> => {
    // const res = await this.fetch<TaskEntity>(`/tasks/${id}`, {
    //   method: 'PATCH',
    //   body: JSON.stringify(task),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    const { data } = await this._http.patch<PatchTaskResponse>(`/tasks/${id}`, task);

    return data;
  };

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }
}

export const TaskAgentInstance = new TasksAgent();
