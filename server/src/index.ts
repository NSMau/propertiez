import 'dotenv/config'

import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'

import connectDatabase from './database'

import express, { type Application } from 'express'
import http from 'http'

import { resolvers, typeDefs } from './graphql'

async function startApolloServer(app: Application): Promise<void> {
  const db = await connectDatabase()

  const { PORT } = process.env
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
  ).catch((error) => {
    console.error('Failed to start the server:', error)
    process.exit(1)
  })

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )

  // const listings = await db.listings.find({}).toArray()
  // console.log(listings)
}

startApolloServer(express()).catch((error) => {
  console.error('Failed to start the server:', error)
  process.exit(1)
})
