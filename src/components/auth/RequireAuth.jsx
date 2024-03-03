import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = localStorage.getItem("userId");
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
