import axios from 'axios';

const ServicioMovilidadInterna = {
  GetOfertas: async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL_PROD}/apinueve/Movilidadinterna`,
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
        `${process.env.REACT_APP_API_BASE_URL_PROD}/apinueve/CreacionMovilidadInterna`,
        {
          TituloOferta: nuevaOferta.TituloOferta,
          Estado: nuevaOferta.Estado, // Asegúrate de que el campo 'Estado' esté en el cuerpo del POST
          Descripcion: nuevaOferta.Descripcion,
          idUsuario: nuevaOferta.idUsuario
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
  },
  PostAplicarOferta: async (aplicacion) => {
    try {
      console.log(aplicacion)
      debugger
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL_PROD}/apinueve/MovilidadInternaAplicacion`,
        { aplicacion },
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
  },
  GetAplicaciones: async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL_PROD}/apinueve/Getofertas`,
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
  DeleteAplicaciones:async(aplicacion)=> {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL_PROD}/apinueve/EliminarAplicacion`, { aplicacion },
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
  Deleteofertas:async(Id)=> {
    try {
      debugger
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL_PROD}/apinueve/Eliminaroferta`, { Id },
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
  }
};

export default ServicioMovilidadInterna;
