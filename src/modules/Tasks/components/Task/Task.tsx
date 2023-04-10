import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContent, ButtonGroup, Stack, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskProps } from './Task.types';
import { TaskCard, TaskTypography } from './Task.styled';
import { ROOT, EDIT } from 'constants/index';

export function Task({ task, onDelTask, onTaskComplete, onTaskIsImportant }: TaskProps) {
  const { id, info, isCompleted, isImportant, name } = task;
  const navigate = useNavigate();

  const onBtnImportantClick = () => onTaskIsImportant(id, isImportant);

  const onBtnDeleteClick = () => onDelTask(id);

  const onBtnCompleteClick = () => onTaskComplete(id, isCompleted);

  const onBtnEditClick = () => navigate(`${ROOT}${EDIT}/${id}`);

  return (
    <TaskCard component="li">
      <CardContent>
        <Stack component="div" direction="row" justifyContent="space-between" marginBottom={2}>
          <TaskTypography
            color={isImportant ? 'green' : 'black'}
            width={350}
            completed={isCompleted ? 'true' : ''}
            component="h3">
            {name}
          </TaskTypography>

          <ButtonGroup size="small">
            <Button
              variant={isImportant ? 'contained' : 'outlined'}
              color="success"
              onClick={onBtnImportantClick}
              type="button"
              disabled={isCompleted}
              aria-label="setImportant">
              <PriorityHighIcon />
            </Button>

            <Button
              color="error"
              variant={isCompleted ? 'contained' : 'outlined'}
              onClick={onBtnCompleteClick}
              type="button"
              aria-label="setComplete">
              <CheckIcon />
            </Button>

            <Button color="error" onClick={onBtnDeleteClick} type="button" aria-label="delete">
              <DeleteIcon />
            </Button>

            <Button color="info" type="button" onClick={onBtnEditClick} aria-label="edit">
              <EditIcon />
            </Button>
          </ButtonGroup>
        </Stack>

        <TaskTypography color={isImportant ? 'green' : 'black'} completed={isCompleted ? 'true' : ''} component="p">
          {info}
        </TaskTypography>
      </CardContent>
    </TaskCard>
  );
}
