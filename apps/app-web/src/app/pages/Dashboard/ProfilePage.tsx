import { RouteComponentProps } from '@reach/router';
import React from 'react';
import BasicDetailsForm from '@app-web/components/Dashboard/Profile/BasicDetailsForm';
import ResetEmailForm from '@app-web/components/Dashboard/Profile/ResetEmailForm';
import ResetPasswordForm from '@app-web/components/Dashboard/Profile/ResetPasswordForm';

export default function ProfilePage(props: RouteComponentProps) {
  return (
    <div>
      <BasicDetailsForm />
      <ResetEmailForm />
      <ResetPasswordForm />
    </div>
  );
}
