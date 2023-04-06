import { TasksStatsEntity } from 'domains/Tasks.entity';
import { GetAllTasksResponse } from 'http/model';

export const TaskStatsCalc = (tasks: GetAllTasksResponse): TasksStatsEntity => {
  const result: TasksStatsEntity = {
    done: 0,
    important: 0,
    total: tasks.length,
  };

  tasks.forEach((item) => {
    if (item.isImportant) {
      result.important++;
    }

    if (item.isCompleted) {
      result.done++;
    }
  });

  return result;
};
