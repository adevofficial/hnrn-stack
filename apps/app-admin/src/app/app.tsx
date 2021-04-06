import { ApolloClient, InMemoryCache } from '@apollo/client';
import buildHasuraProvider from 'ra-data-hasura-graphql';
import React, { useEffect, useState } from 'react';
import { Admin } from 'react-admin';
import resources from '@app-admin/resources';
import customBuildFields from '@app-admin/helpers/custom-build-fields';
import { auth } from '@hnrn-stack/hbp-client';
import { HBPAuthProvider } from '@hnrn-stack/hbp-ra-auth';

const authProvider = new HBPAuthProvider(auth);

export function App() {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const myClient = new ApolloClient({
        uri: process.env.NX_HASURA_BASE_URL,
        cache: new InMemoryCache(),
        headers: {
          'x-hasura-admin-secret': process.env.NX_HASURA_GRAPHQL_ADMIN_SECRET,
        },
      });

      const dataProvider = await buildHasuraProvider(
        {
          client: myClient,
        },
        { buildFields: customBuildFields }
      );
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      {resources}
    </Admin>
  );
}

export default App;
