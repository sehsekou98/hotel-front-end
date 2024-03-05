import  { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import jwt_decode from 'jwt-decode';

// Now you can use jwt_decode in your code


export const AuthContext = createContext({
  user: null,
  handleLogin: () => {}, // Removed token parameter
  handleLogout: () => {}
});

export const AuthProvider = ({ children, token }) => {
  const [user, setUser] = useState(null);

  const handleLogin = () => { // Removed token parameter
    if (token) {
      const decodedUser = jwt_decode(token);
      localStorage.setItem("userId", decodedUser.sub);
      localStorage.setItem("userRole", decodedUser.roles);
      localStorage.setItem("token", token);
      setUser(decodedUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    handleLogin(); // Removed token argument
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  token: PropTypes.string,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
