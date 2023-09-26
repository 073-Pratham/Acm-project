import { useNavigate , Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({isAdmin}) => {

  const { isAuthenticated , loading , user } = useSelector(state => state.user);
  const navigate = useNavigate();

  return loading === false && isAuthenticated === false ? (
    navigate("/")
    ) : (
        isAdmin === true && user.role !== "admin" ? (
            navigate("/")
        ) : (
        <Outlet />
        )
    )
}
export default ProtectedRoute;
