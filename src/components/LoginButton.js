import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return !isAuthenticated ? (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  ) : (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
}

export default LoginButton;