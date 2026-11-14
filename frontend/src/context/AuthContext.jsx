import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('foodfleet_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('foodfleet_token')));

  useEffect(() => {
    if (!localStorage.getItem('foodfleet_token')) { setLoading(false); return; }
    api('/auth/me').then(data => setUser(data.user)).catch(() => {
      localStorage.removeItem('foodfleet_token'); localStorage.removeItem('foodfleet_user'); setUser(null);
    }).finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const data = await api('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    localStorage.setItem('foodfleet_token', data.token);
    localStorage.setItem('foodfleet_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };
  const register = async (payload) => {
    const data = await api('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
    localStorage.setItem('foodfleet_token', data.token);
    localStorage.setItem('foodfleet_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };
  const logout = () => {
    localStorage.removeItem('foodfleet_token'); localStorage.removeItem('foodfleet_user'); setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
