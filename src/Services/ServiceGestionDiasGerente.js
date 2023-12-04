import axios from 'axios';
const ServiceGestionDiasGerente = {
  CargarSolicitudesVacaciones: async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const response = await axios.get('http://localhost:3023/apitres/ObtenerDiasAdmi', // Pasa los datos del nuevo usuario como el cuerpo de la solicitud
      {
        headers: {
          'authorization': `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al cargar días en el calendario');
    }
  },
  ActualizarEstado:async (Estado,id)=> {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      console.log(Estado)
      const response = await axios.post('http://localhost:3023/apitres/updateAdmiDias',{Estado,id} ,// Pasa los datos del nuevo usuario como el cuerpo de la solicitud
      {
        headers: {
          'authorization': `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al cargar días en el calendario');
    }
  },
};
export default ServiceGestionDiasGerente;