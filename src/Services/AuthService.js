import axios from 'axios';

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await axios.post('https://apiwhatsappcarsdr-bf50247ea68c.herokuapp.com/ApiRestablecer/Cambiocontrasena', {
        username,
        password
      });

      return response.data;
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  },
};

export default AuthService;
