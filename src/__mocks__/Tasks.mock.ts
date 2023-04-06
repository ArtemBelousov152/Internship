import { TasksStatsEntity, TaskEntity } from 'domains/Tasks.entity';

export const TasksStatsMock: TasksStatsEntity = {
  done: 1,
  important: 2,
  total: 4,
};

export const TasksMock: TaskEntity[] = [
  {
    name: 'Wash',
    id: '222',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    isImportant: false,
    isCompleted: true,
  },
  {
    name: 'Clean',
    id: '666',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    isImportant: true,
    isCompleted: false,
  },
  {
    name: 'Watch',
    id: '444',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    isImportant: true,
    isCompleted: false,
  },
  {
    name: 'Make',
    id: '111',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    isImportant: false,
    isCompleted: false,
  },
];
