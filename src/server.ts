import { ApolloServer, gql } from "apollo-server";
import { Context, context } from "./context";

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Movies {
    title: String
    director: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    movies: [Movies]
  }
`;

const resolvers = {
  Query: {
    movies: (_parent: any, _args: any, context: Context) => {
      return context.prisma.movie.findMany();
    }
  }
};
const server = new ApolloServer({typeDefs,resolvers, context: context});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});