export const auth = {
    isAuthenticated: () => {
      return localStorage.getItem('authToken') !== null;
    },
    login: (token) => {
      localStorage.setItem('authToken', token);
    },
    logout: () => {
      localStorage.removeItem('authToken');
    }
  };