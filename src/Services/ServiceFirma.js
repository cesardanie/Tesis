import axios from 'axios';

const ServiceFirma = {
  PostFirma: async (firmaBase64) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;

      const response = await axios.post(
        'http://localhost:3023/apiseis/FirmaInsert',
        firmaBase64,
        {
          headers: {
            'authorization': token,
            'Content-Type': 'multipart/form-data',
          
          },
          
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener Firma');
    }
  },
};

export default ServiceFirma;
