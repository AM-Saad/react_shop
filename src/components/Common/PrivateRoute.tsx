
import {useContext} from 'react'
import AdminContext from '../../store/Admin/admin-context';
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...props }) => {
  const { isLoggedIn } = useContext(AdminContext);
  return <Route {...props}
      render={_ => {
          if (!isLoggedIn)
              return <Redirect to='/admin/login' />;
          return children;
      }} />;
}
export default PrivateRoute;