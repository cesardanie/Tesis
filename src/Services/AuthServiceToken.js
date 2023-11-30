// AuthService.js
const AuthServiceToken = {
    isLoggedIn: () => {
      return localStorage.getItem('token') !== null;
    },
    getRole: () => {
      return localStorage.getItem('role');
    },
    getEstado: () => {
      return localStorage.getItem('estado') === 'true';
    },
  };
  
  export default AuthServiceToken;
  