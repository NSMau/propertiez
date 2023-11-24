import { gql } from 'apollo-server-core'

/*
 * A schema is a collection of type definitions (hence "typeDefs")
 * that together define the "shape" of queries that are executed against
 * your data.
 */
export const typeDefs = gql`
  # This "Listing" type defines the queryable fields for every listing in our data source.
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  # The "Query" type is the root of all GraphQL queries (read operations) that
  # clients execute against our data, along with the return type for each field.
  # In this case, the "listings" query returns an array of zero or more Listings (defined above).
  type Query {
    listings: [Listing!]!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
  }
`
