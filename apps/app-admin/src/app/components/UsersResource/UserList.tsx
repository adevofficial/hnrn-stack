import { getAvatarURL } from '@hnrn-stack/common-helpers';
import { Avatar } from '@material-ui/core';
import {
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  FunctionField,
  List,
  TextField,
} from 'ra-ui-materialui';
import React from 'react';
import { titleCase } from 'title-case';

export default function UserList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="show">
        <FunctionField
          label="Avatar"
          render={(record) => (
            <Avatar alt={`${record.name}`} src={`${getAvatarURL(record.id)}`} />
          )}
        />
        <TextField label="Name" source="display_name" />
        <EmailField label="Email" source="account.email" />
        <BooleanField label="Active" source="account.active" />

        <FunctionField
          render={(record) => titleCase(`${record?.account?.default_role}`)}
          label="Role"
        />
        <DateField source="created_at" />
      </Datagrid>
    </List>
  );
}
