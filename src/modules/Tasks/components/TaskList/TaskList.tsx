import React from 'react';
import { observer } from 'mobx-react';
import { Task } from '../Task';
import { TaskStoreInstanse } from '../../store';
import { Loader } from 'components/Loader';
import './Task.css';

const TaskListComponent = () => {
  const { changeTaskComplete, changeTaskIsImportant, delTask, isLoading, tasks } = TaskStoreInstanse;

  return (
    <Loader isLoading={isLoading} variant="circle">
      <ul className="list-group todo-list mb-3">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            <Task
              task={task}
              onDelTask={delTask}
              onTaskComplete={changeTaskComplete}
              onTaskIsImportant={changeTaskIsImportant}
            />
          </li>
        ))}
      </ul>
    </Loader>
  );
};

export const TaskList = observer(TaskListComponent);
