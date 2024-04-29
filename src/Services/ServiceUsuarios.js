import axios from 'axios';

const ServiceUsuarios = {
  ObtenerUsuarios: async () => {
    try {
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const token = sessionObject.token;
        const response = await axios.get('http://18.212.252.249/api/ObtenerUsuarios',{
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
      const response = await axios.post('http://18.212.252.249/delete/EliminarUsuarios', {
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
        'http://18.212.252.249:3023/add/AgregarUsuarios',
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