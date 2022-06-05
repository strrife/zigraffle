import { gql } from 'apollo-server-express';

export const typeDef = gql`
  scalar Date

  type Bid {
    value: Int
    date: Date
  }

  type BasketItem {
    ticker: String!
    amount: Int!
  }

  type Auction {
    id: ID!
    createdAt: Date
    expiresAt: Date
    image: String
    status: String
    monetaryValue: String
    description: String
    basket: [BasketItem]
    title: String!
    lastBid: Bid
  }

  extend type Query {
    auctions(id: ID): [Auction]
  }

  extend type Subscription {
    bidAdded: Auction
    auctionStatusChanged: Auction
  }

  extend type Mutation {
    bid(id: ID!, bid: Int!): Auction
  }
`;