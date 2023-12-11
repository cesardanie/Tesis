import axios from 'axios';
const ServiceCambiodeCuenta = {
  CargarCuentaEdit: async (data) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const id=sessionObject.id;
      data.id = id;
      const response = await axios.post('http://localhost:3023/apicuatro/cambiarcuenta', data, // Pasa los datos del nuevo usuario como el cuerpo de la solicitud
      {
        headers: {
          'authorization': `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al realizar el cambio de cuenta');
    }
  },
  ExtraerCuenta: async (id) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const id = sessionObject.id;
      console.log("paso por aqui", id, token)
      const response = await axios.post('http://localhost:3023/apicuatro/OntenerCuenta', { id },{
          headers: {
              'authorization': `${token}`,
            }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener dias');
    } 
  },
  ExtraerCuentaTotal:async () => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const response = await axios.get('http://localhost:3023/apicuatro/obtenerDatosCompletos',{
          headers: {
              'authorization': `${token}`,
            }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener dias');
    } 
  },
  InsertarDatos:async (data) => {
    try {
      console.log(data)
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const token = sessionObject.token;
      const response = await axios.post('http://localhost:3023/apicuatro/IngresarDatosdecuenta',{data},{
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
export default ServiceCambiodeCuenta;