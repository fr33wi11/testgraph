import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth0Config } from './auth0-config';
import { useAuth0 } from '@auth0/auth0-react';
import EmployeeList from './components/EmployeeList';
import LoginButton from './components/LoginButton';
import './App.css';

// Create Apollo Link with Auth Header
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HASURA_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from Auth0
  const token = localStorage.getItem('auth0_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <LoginButton />;
};

function App() {
  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      redirectUri={auth0Config.redirectUri}
      audience={auth0Config.audience}
    >
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h1>Employee Management</h1>
          </header>
          <main>
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          </main>
        </div>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;