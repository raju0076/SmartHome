export const auth = {
    isAuthenticated: () => {
      return localStorage.getItem('token') !== null;
    },
    login: (token) => {
      localStorage.setItem('token', token);
    },
    logout: () => {
      localStorage.removeItem('token');
    }
  };