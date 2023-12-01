import axios from 'axios';

const ServiceUsuarios = {
  ObtenerUsuarios: async () => {
    try {
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const token = sessionObject.token;
        const response = await axios.get('http://localhost:3023/api/ObtenerUsuarios',{
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
      const response = await axios.post('http://localhost:3023/delete/EliminarUsuarios', {
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
  }
};

export default ServiceUsuarios;