import { Navigate } from 'react-router-dom';

function ProtectedRouteElement({element: Component, ...props}) {
  return(
    props.isLoggedIn ? Component : <Navigate to="/sign-up"/>
  )
}

export default ProtectedRouteElement;
