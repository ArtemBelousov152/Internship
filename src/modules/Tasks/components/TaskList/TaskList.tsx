import React from 'react';
import { observer } from 'mobx-react';
import { Task } from '../Task';
import { TaskStoreInstanse } from '../../store';
import { Loader } from 'components/Loader';
import './Task.css';

const TaskListComponent = () => {
  return (
    <Loader isLoading={TaskStoreInstanse.isLoading} variant="circle">
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
    </Loader>
  );
};

export const TaskList = observer(TaskListComponent);
