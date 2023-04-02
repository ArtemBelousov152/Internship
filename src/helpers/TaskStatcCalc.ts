import { TaskEntity, TasksStatsEntity } from 'domains/Tasks.entity';

export const TaskStatsCalc = (tasks: TaskEntity[]): TasksStatsEntity => {
  const result: TasksStatsEntity = {
    done: 0,
    important: 0,
    total: 0,
  };

  tasks.forEach((item) => {
    result.total++;

    if (item.isImportant) {
      result.important++;
    }

    if (item.isCompleted) {
      result.done++;
    }
  });

  return result;
};
