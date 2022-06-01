import Apollo, { ApolloError } from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";


/**
 * typeDefs: GraphQL schema definicao dos tipos de dados
 * resolvers: Funções que manipulam os dados
 * input: cliente envia para o server
 * type: server envia pro cliente
 */

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String
    age: Int
  }

  input UserData {
    name: String
    age: Int
  }

  type Query {
    users(id: ID):[User]!
  }

  type Mutation {
    MergeUser(id: ID, deleteIt: Boolean, input: UserData): User
  }
`

let users = [
  { id: 0, name: 'John', age: 30 },
  { id: 1, name: 'Jane', age: 20 }
];

const resolvers = {
  Query: {
    users: (_, { id }) => {
      if (id) {
        const user = users.filter(user => {
          return user.id === Number(id);
        })
        if (!user.length) {
          throw new ApolloError('User not found');
        }
        return user;
      };
      return users;
    }
  },
  Mutation: {
    MergeUser: (parent, { id, deleteIt, input }, context, info) => {
      return null;
    }
  }
}

const server = new Apollo.ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  formatError: (error) => {
    // eslint-disable-next-line no-param-reassign
    delete error.extensions.exception.stacktrace
    const errorlog = {
      message: error.message,
      code: error.extensions.code,
      Detail: error.extensions.exception ? error.extensions.exception : null,
      Path: error.path ? error.path[0] : null,
    }
    // eslint-disable-next-line no-console
    console.error('\x1b[31m%s\x1b[0m', `[${'s'}] ERROR: Server: ${JSON.stringify(errorlog)}`)
    return errorlog
  },
});

const serverInit = () => {
  server.listen(process.env.PORT || 3000, '0.0.0.0').then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

serverInit();