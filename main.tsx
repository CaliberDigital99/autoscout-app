import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

const auth = btoa('be-2142197877:sjbmybZFty1EM1nqpnqEAFl7KhYNlc');

const httpLink = createHttpLink({
  uri: 'https://listing-search.api.autoscout24.com/graphql',
  headers: {
    Authorization: `Basic ${auth}`
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);