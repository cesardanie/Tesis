import axios from 'axios';
const ServiceCalendario = {
  CargarDias: async (data) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const id=sessionObject.id;
      data.id = id;
      const response = await axios.post('http://18.212.252.249/apidos/AgregarDias', data, // Pasa los datos del nuevo usuario como el cuerpo de la solicitud
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
  ExtraerDias: async (id) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      console.log("paso por aqui", id, token)
      const response = await axios.post('http://18.212.252.249:3023/apidos/ObtenerDias', { id },{
          headers: {
              'authorization': `${token}`,
            }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener dias');
    } 
  }
};
export default ServiceCalendario;