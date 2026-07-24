import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if returning from Google OAuth with query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');
    const role = params.get('role');

    if (token && name) {
      const userData = { token, name, email, role };
      setUser(userData);
      localStorage.setItem('recruiter_user', JSON.stringify(userData));
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Check local storage for existing session
      const storedUser = localStorage.getItem('recruiter_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('recruiter_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recruiter_user');
    // Clear cookie by navigating to a backend logout route if needed, or just clear local state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
