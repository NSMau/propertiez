import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import {DocumentNode} from 'graphql/language'

async function startApolloServer(typeDefs: DocumentNode, resolvers: {}) {
    const app = express()
    const PORT = 4000
    const httpServer = http.createServer(app)
    // The http server handles the request and response cycle made to/from the Express app
    const server = new ApolloServer({
        typeDefs,
        resolvers,
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

    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)