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
            'authorization': `Bearer ${token}`, // Usa 'Bearer' en el header de autorización
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al obtener las ofertas:', error);
      throw new Error('Error al obtener data');
    }
  },

  PostOferta: async (nuevaOferta) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      console.log(nuevaOferta)
      const response = await axios.post(
        'http://localhost:3023/apinueve/CreacionMovilidadInterna',
        {
          TituloOferta: nuevaOferta.TituloOferta,
          Estado: nuevaOferta.Estado, // Asegúrate de que el campo 'Estado' esté en el cuerpo del POST
          Descripcion: nuevaOferta.Descripcion,
          idUsuario:nuevaOferta.idUsuario
        },
        {
          headers: {
            'authorization': `Bearer ${token}`, // Usa 'Bearer' en el header de autorización
          }
        }
      );

      return response.data;

    } catch (error) {
      console.error('Error al crear la oferta:', error);
      throw new Error('Error al crear la oferta');
    }
  }
};

export default ServicioMovilidadInterna;
