import Apollo from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const typeDefs = `#graphql
  type Query {
    hello(name: String): String
    #query que recebe dois numero e retorna a soma
    #Recebe uma string e retorna a string uppercase
    #recebe dois parametros, um booleano (issum) e dois numero. Quando booleano for true, soma os numeros, quando for false, subtrai os numeros.
  }
`

const resolvers = {
  Query: {
    hello: (_, args) => `Hello ${args.name || 'World'}`
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