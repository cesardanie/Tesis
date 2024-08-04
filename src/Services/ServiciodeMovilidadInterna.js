import axios from 'axios';

const ServicioMovilidadInterna = {
  GetOfertas: async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;

      const response = await axios.get(
        'http://localhost:3023/apinueve/Movilidadinterna',
        {
          headers: {
            'authorization': `${token}`,
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error ', error);
      throw new Error('Error al obtener data');
    }
  },
  PostOferta: async (id,Titulo,Estado,Descripcion

  ) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;

      const response = await axios.post(
        'http://localhost:3023/apinueve/CreacionMovilidadInterna',{
          id:id,
          TituloOferta:Titulo,
          Estado:Estado,
          Descripcion:Descripcion
        },
        {
          headers: {
            'authorization': `${token}`,
          }
        }
      );

      return response.data;

    } catch (error) {
      console.error('Error ', error);
      throw new Error('Error al obtener data');
    }
  }
};

export default ServicioMovilidadInterna;