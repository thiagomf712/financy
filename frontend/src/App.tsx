import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { apolloClient } from './lib/graphql/apollo'
import { AppRouter } from './Router'

export function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  )
}
