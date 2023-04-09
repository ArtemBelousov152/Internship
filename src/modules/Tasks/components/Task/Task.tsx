import React from 'react';
import { Link } from 'react-router-dom';
import { TaskProps } from './Task.types';
import { ROOT, EDIT } from 'constants/index';

export function Task({ task, onDelTask, onTaskComplete, onTaskIsImportant }: TaskProps) {
  const { id, info, isCompleted, isImportant, name } = task;

  return (
    <div>
      <div className="task mb-2">
        <p
          className={`task__label ${isCompleted ? 'text-decoration-line-through text-secondary' : ''} ${
            isImportant ? 'text-success fw-bold' : ''
          }`}>
          {name}
        </p>

        <div className="task__btns">
          <button
            onClick={() => onTaskIsImportant(id, isImportant)}
            type="button"
            className={`task__btn btn ${
              isImportant ? 'btn-success' : 'btn-outline-success'
            } btn-sm float-right btn-important`}
            disabled={isCompleted}>
            <i className="fa fa-exclamation" />
          </button>

          <button
            onClick={() => onTaskComplete(id, isCompleted)}
            type="button"
            className={`task__btn btn ${isCompleted ? 'btn-danger' : 'btn-outline-danger'} btn-sm float-right`}>
            <i className="fa fa-check" />
          </button>

          <button
            onClick={() => onDelTask(id)}
            type="button"
            className="task__btn btn btn-outline-danger btn-sm float-right btn-delete">
            <i className="fa fa-trash-o" />
          </button>
          <Link className="task__btn btn btn-outline-secondary btn-sm float-right" to={`${ROOT}${EDIT}/${id}`}>
            <i className="fa fa-pencil" />
          </Link>
        </div>
      </div>
      <p
        className={`${isCompleted ? 'text-decoration-line-through text-secondary' : ''} ${
          isImportant ? 'text-success fw-bold' : ''
        }`}>
        {info}
      </p>
    </div>
  );
}
