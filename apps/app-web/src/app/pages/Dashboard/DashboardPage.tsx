import { RouteComponentProps } from '@reach/router';
import { useAuth } from '@hnrn-stack/auth';
import React from 'react';

export default function DashboardPage(props: RouteComponentProps) {
  const { user } = useAuth();

  return <div>Welcome Hello {user != null ? user.display_name : ''}</div>;
}
