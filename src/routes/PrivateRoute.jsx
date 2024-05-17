import { Navigate } from 'react-router-dom';
import { isLogin } from '../middleware/auth';
const PrivateRoute = ({ element, ...rest }) => {
  if (isLogin()) {
    return element;
  } else {
    return <Navigate to="/" state={{ from: rest.location }} />;
  }
};

export default PrivateRoute;
