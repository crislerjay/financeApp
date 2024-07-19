import { Outlet, Navigate } from 'react-router-dom'
import { useClerk, useUser } from "@clerk/clerk-react";
import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect } from 'react';

const PrivateRoutes = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();

    useEffect(() => {
      let timeout;

      const resetTimeout = () => {
          if (timeout) {
              clearTimeout(timeout);
          }
          timeout = setTimeout(() => {
              signOut();
          }, 300000); // 5 minutes in milliseconds
      };

      const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

      events.forEach(event => window.addEventListener(event, resetTimeout));

      resetTimeout();

      return () => {
          events.forEach(event => window.removeEventListener(event, resetTimeout));
          if (timeout) {
              clearTimeout(timeout);
          }
      };
    }, [signOut]);
  
    if (!isLoaded) { return <LoadingSpinner /> }

    if (!user) { return <Navigate to="/auth"/>; }

    if (isSignedIn) {
      let auth = {'token':true}
      return(
        auth.token ? <Outlet/> : <Navigate to="/auth"/>
      )
    }
}

export default PrivateRoutes