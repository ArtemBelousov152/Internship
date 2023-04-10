import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { PageContainer, Title } from 'components/index';
import { PATH_LIST } from 'constants/index';
import { Tasks } from 'modules/index';

export const TaskPage = () => {
  const navigate = useNavigate();

  const goToAddTask = () => {
    navigate(PATH_LIST.ADD);
  };

  return (
    <PageContainer>
      <Title>TODO LIST</Title>
      <Tasks />
      <Button fullWidth onClick={goToAddTask} variant="contained" type="submit" color="inherit">
        Add task
      </Button>
    </PageContainer>
  );
};
