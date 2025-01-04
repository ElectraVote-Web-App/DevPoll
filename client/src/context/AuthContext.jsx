import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode"; // For decoding JWT tokens

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    /**
     * payload
     * {
     *   "id": 4,
     *   "email": "gmail@gmail.com",
     *   "username": "name",
     *   "img": "avatar.png || '' ",
     *   "iat": 1735995485,
     *   "exp": 1736081885
     * }
     * 
     */


  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log(decodedUser);
        setUser(decodedUser); 
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token"); 
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser); 
    console.log('user');
    console.log(user);
    
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};