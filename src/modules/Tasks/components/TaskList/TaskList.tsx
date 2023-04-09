import React from 'react';
import { observer } from 'mobx-react';
import { Task } from '../Task';
import { TaskStoreInstanse } from '../../store';
import { Loader, Error } from 'components/index';
import './Task.css';

function TaskListComponent() {
  if (TaskStoreInstanse.isError) {
    return <Error />;
  }
  return (
    <Loader isLoading={TaskStoreInstanse.isLoading} variant="circle">
      {TaskStoreInstanse.tasks.length ? (
        <ul className="list-group todo-list mb-3">
          {TaskStoreInstanse.tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <Task
                task={task}
                onDelTask={TaskStoreInstanse.delTask}
                onTaskComplete={TaskStoreInstanse.changeTaskComplete}
                onTaskIsImportant={TaskStoreInstanse.changeTaskIsImportant}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center d-block text-secondary">Задач не найдено</p>
      )}
    </Loader>
  );
}

export const TaskList = observer(TaskListComponent);
