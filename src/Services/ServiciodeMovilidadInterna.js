import axios from 'axios';

const ServicioMovilidadInterna = {
  GetOfertas: async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      
      // Incluir el 'id' en los datos que se envían en la solicitud POST
      const response = await axios.get(
        'http://localhost:3023/apinueve/Movilidadinterna',
        { }, // Aquí se envía el id como parte de los datos
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error al enviar la firma:', error);
      throw new Error('Error al obtener Firma');
    }
  },
};

export default ServicioMovilidadInterna;