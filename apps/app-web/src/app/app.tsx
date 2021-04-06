import { GraphQLProvider } from '@hnrn-stack/hasura-graphql';
import React from 'react';
import AppRouter from '@app-web/router';
import { HASURA_BASE_URL } from '@hnrn-stack/common-configs';
import { auth } from '@hnrn-stack/hbp-client';
import { AuthProvider } from '@hnrn-stack/auth';

const App = () => (
  <AuthProvider auth={auth}>
    <GraphQLProvider auth={auth} url={HASURA_BASE_URL}>
      <AppRouter />
    </GraphQLProvider>
  </AuthProvider>
);

export default App;
