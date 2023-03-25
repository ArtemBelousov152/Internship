import React from 'react';
import { Task } from '../Task';
import { TaskListProps } from './TaskList.types';
import './Task.css';

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className="list-group todo-list mb-3">
      {tasks.map((task) => (
        <li key={task.id} className="list-group-item">
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};
