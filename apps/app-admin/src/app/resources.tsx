import UserEdit from '@app-admin/components/UsersResource/UserEdit';
import UserList from '@app-admin/components/UsersResource/UserList';
import UserShow from '@app-admin/components/UsersResource/UserShow';
import { Resource } from 'ra-core';
import React from 'react';

export default [
  <Resource name="users" show={UserShow} edit={UserEdit} list={UserList} />,
];
