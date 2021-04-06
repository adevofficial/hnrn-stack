import { buildFields } from 'ra-data-hasura-graphql';
import { ResourceType, FetchType } from 'ra-data-hasura-graphql';

import users from '@app-admin/components/UsersResource/queries';

/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst: any) =>
  queryAst.definitions[0].selectionSet.selections;

// An object of all the custom queries we have defined.
const CUSTOM_QUERIES: any = {
  users,
};

// Function which defines query overrides for specific resources/fetchTypes.
const customBuildFields = (type: ResourceType, fetchType: FetchType) => {
  const resourceName: string = type.name;

  // First check if the resource has any custom queries defined.
  const resourceCustomQueries = CUSTOM_QUERIES[resourceName];

  // If this specific query i.e. resource and fetchType has a custom query, extract the fields from it.
  if (resourceCustomQueries && resourceCustomQueries[fetchType]) {
    return extractFieldsFromQuery(resourceCustomQueries[fetchType]);
  }

  // No custom query defined, so use the default query fields (all, but none related/nested).
  return buildFields(type, fetchType);
};

export default customBuildFields;
