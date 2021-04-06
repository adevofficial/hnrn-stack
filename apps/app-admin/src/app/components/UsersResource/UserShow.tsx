import { DateField, Show, SimpleShowLayout, TextField } from 'ra-ui-materialui';
import React from 'react';

export default function UserShow(props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="display_name" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
      </SimpleShowLayout>
    </Show>
  );
}
