import { Skeleton, styled, Typography } from '@mui/material';

export const TaskSkeleton = styled(Skeleton)({
  display: 'inline-block',
  width: 25,
  height: 25,
  marginLeft: 5,
});

export const TaskStatsCount = styled(Typography)({
  marginLeft: 5,
  textAlign: 'center',
  display: 'inline-block',
  minWidth: 25,
  borderRadius: 5,
  backgroundColor: '#DADADA',
}) as typeof Typography;
