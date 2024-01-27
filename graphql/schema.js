import { users } from './queries.js';
import { register } from './mutations.js';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: { users },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: { register },
});

// Define Schema
const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export { schema, QueryType, MutationType };