import Apollo from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const typeDefs = `#graphql
  type Query {
    hello(name: String): String
  }
`

const resolvers = {
  Query: {
    hello: (_, args, ctx) => `Hello ${args.name || 'World'}`
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