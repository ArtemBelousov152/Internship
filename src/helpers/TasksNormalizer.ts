import { TaskEntity } from 'domains/Tasks.entity';
import { GetAllTasksResponse, GetTaskResponse } from 'http/model';

export const NormalizeTask = (task: GetTaskResponse): TaskEntity => {
  return {
    id: String(task.id),
    info: task.info || 'Нет описания',
    name: task.name || 'Нет названия',
    isCompleted: task.isCompleted || false,
    isImportant: task.isImportant || false,
  };
};

export const NormalizeTasks = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const normalizeTasks: TaskEntity[] = [];

  tasks.forEach((task) => {
    if (task.id) {
      normalizeTasks.push({
        id: String(task.id),
        info: task.info || 'Нет описания',
        name: task.name || 'Нет названия',
        isCompleted: task.isCompleted || false,
        isImportant: task.isImportant || false,
      });
    }
  });

  return normalizeTasks;
};
