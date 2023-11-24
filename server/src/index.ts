import 'dotenv/config'

import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'

import connectDatabase from './database'

import express from 'express'
import http from 'http'

import { resolvers, typeDefs } from './graphql'
import { DocumentNode } from 'graphql/language'

async function startApolloServer(typeDefs: DocumentNode, resolvers: {}) {
  const db = await connectDatabase()

  const app = express()
  const { PORT = 3000 } = process.env
  const httpServer = http.createServer(app)
  // The http server handles the request and response cycle made to/from the Express app
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      // Instructs Apollo Server to drain the HTTP server's existing sockets,
      // enabling graceful shutdown.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Recommended settings to use Apollo Server. For production,
      // use ApolloServerPluginLandingPageProductionDefault instead.
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })

  await server.start()

  server.applyMiddleware({ app, path: '/api' })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )

  const listings = await db.listings.find({}).toArray()
  console.log(listings)
}

startApolloServer(typeDefs, resolvers)
