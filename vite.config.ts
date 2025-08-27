import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './src/graphql/schema'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'graphql-server',
      async configureServer(server) {
        const app = express()
        
        const apolloServer = new ApolloServer({
          schema,
          introspection: true,
        })
        
        await apolloServer.start()
        apolloServer.applyMiddleware({ app, path: '/graphql' })
        
        server.middlewares.use('/graphql', app)
      }
    }
  ],
})
