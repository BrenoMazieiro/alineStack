import Apollo from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";


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
    MergeUser(id: ID, input: UserData): User
  }
`
const users = [
  { id: '1', name: 'John', age: 30 },
  { id: '2', name: 'Jane', age: 20 }
];

const resolvers = {
  Query: {
    users: (_, { id }) => {
      if (id) {
        return users.filter(user => {
          return user.id === id
        })
      };
      return users;
    }
  },
  Mutation: {
    MergeUser: (parent, args, context, info) => {
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
});

const serverInit = () => {
  server.listen(process.env.PORT || 3000, '0.0.0.0').then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

serverInit();