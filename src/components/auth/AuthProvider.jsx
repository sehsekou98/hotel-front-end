import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types"; 
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {}, 
  handleLogout: () => {},
});

export const AuthProvider = ({ children, token }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    const decodedUser = jwt_decode(token);
    localStorage.setItem("userId", decodedUser.sub);
    localStorage.setItem("userRole", decodedUser.roles);
    localStorage.setItem("token", token);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  
  React.useEffect(() => {
    if (token) {
      handleLogin(token);
    }
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
