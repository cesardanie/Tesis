import axios from 'axios';

const ServiceFirma = {
  PostFirma: async (firmaBase64) => {
    try {
      console.log('Datos de firma recibidos:', firmaBase64.value);
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      debugger
      const responsed=await axios.post('http://localhost:3023/apiseis/FirmaInsert',firmaBase64,
      {
        headers: { 'Content-Type': 'multipart/form-data',
                  'authorization': `${token}`,}
      })

      console.log(responsed.data);
      return responsed.data;
    } catch (error) {
      console.error('Error al enviar la firma:', error);
      throw new Error('Error al obtener Firma');
    }
  },
};

export default ServiceFirma;
