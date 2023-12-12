import axios from 'axios';

const ServiceNomina = {
  ObtenerUsuarios: async () => {
    try {
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const token = sessionObject.token;
        const response = await axios.get('http://localhost:3023/apicinco/ExtraerDatosNomina',{
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
  CrearPagoNomina: async (mesSeleccionado,estado,id) => {
    try {
        console.log("entro al servicio");
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const token = sessionObject.token;
        const response = await axios.post('http://localhost:3023/apicinco/AgregarPagos',{mes:mesSeleccionado,estado:estado,id:id},{
            headers: {
                'authorization': `${token}`,
              }
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error('Error al crear el pago de la nómina: ' + JSON.stringify(error));
      }
  },
  ObtenerDatosCliente: async (mesSeleccionado,estado,id) => {
    try {
        console.log("entro al servicio");
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const token = sessionObject.token;
        const id=sessionObject.id
        const response = await axios.post('http://localhost:3023/apicinco/AgregarPagos',{id:id},{
            headers: {
                'authorization': `${token}`,
              }
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error('Error al crear el pago de la nómina: ' + JSON.stringify(error));
      }
  },
};

export default ServiceNomina;