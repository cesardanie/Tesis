import axios from 'axios';

const ServiceUsuarios = {
  ObtenerUsuarios: async () => {
    try {
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const token = sessionObject.token;
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL_PROD}/api/ObtenerUsuarios`,{
            headers: {
                'authorization': `${token}`,
              }
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error('Error al obtener usuarios');
      }
  },
  Eliminar:async (id)=>{
    try{
      console.log(id);
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL_PROD}/delete/EliminarUsuarios`, {
        id: id,
      },{
          headers: {
              'authorization': `${token}`,
            }
      });
      return response.data;
    }catch (error) {
        throw new Error('Error al obtener usuarios');
      }
  },
  AgregarUsuario: async (nuevoUsuario) => {
    try {
      console.log("DATO NUEVO",nuevoUsuario);
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL_PROD}/add/AgregarUsuarios`,
        nuevoUsuario, // Pasa los datos del nuevo usuario como el cuerpo de la solicitud
        {
          headers: {
            'authorization': `${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Error al agregar usuario');
    }
  }
  
};

export default ServiceUsuarios;