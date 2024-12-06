import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Add console.log to check if environment variables are loaded
console.log('Hasura URL:', process.env.REACT_APP_HASURA_ENDPOINT);

const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
    'content-type': 'application/json'
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Employee Management</h1>
        </header>
        <main>
          <EmployeeList />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
