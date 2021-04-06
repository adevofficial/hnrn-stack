import { GraphQLProvider } from "libraries/hasura-graphql/GraphQLProvider";
import React from "react";
import AppRouter from "Router";
import { HASURA_BASE_URL } from "configs";
import { auth } from "helpers/hbp-client";
import { AuthProvider } from "libraries/auth/AuthProvider";

const App = () => (
  <AuthProvider auth={auth}>
    <GraphQLProvider auth={auth} url={HASURA_BASE_URL}>
      <AppRouter />
    </GraphQLProvider>
  </AuthProvider>
);

export default App;
