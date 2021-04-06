import Auth from "nhost-js-sdk/dist/Auth";
import React, { useRef } from "react";
import { Client, createClient, Provider } from "urql";

const createGQLClient = (url: string, auth: Auth) =>
  createClient({
    url,
    fetchOptions: () => {
      const token = auth.getJWTToken();
      return {
        headers: { authorization: token ? `Bearer ${token}` : "" },
      };
    },
  });

interface GraphQLProviderProps {
  children: React.ReactNode;
  auth: Auth;
  url: string;
}

export const GraphQLProvider = ({
  children,
  auth,
  url,
}: GraphQLProviderProps) => {
  const client = useRef<Client>();

  if (!client.current) {
    client.current = createGQLClient(url, auth);
  }

  return <Provider value={client.current}>{children}</Provider>;
};
