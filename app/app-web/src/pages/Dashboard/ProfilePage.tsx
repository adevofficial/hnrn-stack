import { RouteComponentProps } from "@reach/router";
import React from "react";
import BasicDetailsForm from "components/Dashboard/Profile/BasicDetailsForm";
import ResetEmailForm from "components/Dashboard/Profile/ResetEmailForm";
import ResetPasswordForm from "components/Dashboard/Profile/ResetPasswordForm";

export default function ProfilePage(props: RouteComponentProps) {
  return (
    <div>
      <BasicDetailsForm />
      <ResetEmailForm />
      <ResetPasswordForm />
    </div>
  );
}
