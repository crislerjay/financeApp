import { Outlet, Navigate } from 'react-router-dom'
import { useClerk, useUser } from "@clerk/clerk-react";
import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect } from 'react';

const PrivateRoutes = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();

    useEffect(() => {
      const autoLogout = () => {
        console.log('30 minutes have passed!');
        signOut()
      };
  
      // aoto logout after 30 minutes (30 * 60 * 1000 milliseconds)
      const timer = setTimeout(autoLogout, 1800000);
  
      return () => clearTimeout(timer);
    }, []);
  
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