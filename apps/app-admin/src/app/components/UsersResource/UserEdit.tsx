import { DateInput, Edit, SimpleForm, TextInput } from 'ra-ui-materialui';
import React from 'react';

export default function UserEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="display_name" />
        <DateInput source="created_at" />
        <DateInput source="updated_at" />
      </SimpleForm>
    </Edit>
  );
}
