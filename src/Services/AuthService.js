import axios from 'axios';
import CryptoJS from "crypto-js";
const AuthService = {
  login: async (Correo, Contrasena) => {
    try {
      Correo=Correo.toLowerCase();
      Correo=CryptoJS.AES.encrypt(Correo,`${process.env.REACT_APP_MY_KEY}`).toString();
      Contrasena=CryptoJS.AES.encrypt(Contrasena,`${process.env.REACT_APP_MY_KEY}`).toString();    
      const response = await axios.post(`https://backentesis-c23c16c1c921.herokuapp.com/api/IniciarSesion`, {
        Correo,
        Contrasena
      });

      return response.data;
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  },
};

export default AuthService;
