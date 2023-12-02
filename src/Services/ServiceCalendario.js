import axios from 'axios';
const ServiceCalendario = {
  CargarDias: async (data) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const id=sessionObject.id;
      data.id = id;
      const response = await axios.post('http://localhost:3023/apidos/AgregarDias', data, // Pasa los datos del nuevo usuario como el cuerpo de la solicitud
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
  ExtraerDias: async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const response = await axios.get('http://localhost:3023/apidos/ObtenerDias',{
          headers: {
              'authorization': `${token}`,
            }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener usuarios');
    } 
  }
};
export default ServiceCalendario;