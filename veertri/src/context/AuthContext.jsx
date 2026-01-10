import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("veertri_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Mock login logic
    // For now, accept any username/password or specific ones
    // Let's say username "student" and password "password" for demo, or just allow any non-empty
    if (username && password) {
      const mockUser = {
        id: 1,
        name: username,
        email: `${username}@example.com`,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80",
      };
      setUser(mockUser);
      localStorage.setItem("veertri_user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("veertri_user");
  };

  const value = useMemo(
    () => ({ user, login, logout, loading }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
