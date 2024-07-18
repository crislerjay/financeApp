import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoutes = () => {
    const { user, isLoaded, isSignedIn } = useUser();

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