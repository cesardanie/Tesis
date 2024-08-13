import axios from 'axios';
const ServiceAfiliadosPerfil = {
  CargarDatainfo: async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const id=sessionObject.id;
      const response = await axios.get('http://localhost:3023/apiDiez/DatosPerfil', // Pasa los datos del nuevo usuario como el cuerpo de la solicitud
      {
        headers: {
          'authorization': `${token}`,
        },
      });
      return response;
    } catch (error) {
      throw new Error('Error al cargar días en el calendario');
    }
  }
};
export default ServiceAfiliadosPerfil;