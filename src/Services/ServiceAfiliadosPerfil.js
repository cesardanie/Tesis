import axios from 'axios';

const ServiceAfiliadosPerfil = {
    CargarDatainfo: async () => {
        try {
            debugger
            const sessionString = localStorage.getItem('session');
            const sessionObject = JSON.parse(sessionString);
            const token = sessionObject.token;
            const id = sessionObject.id;

            // El ID debe ser parte del cuerpo de la solicitud como un objeto
            const response = await axios.post('http://localhost:3023/apiDiez/DatosPerfil', { id },
                {
                    headers: {
                        'authorization': `${token}`,
                    },
                });
            return response.data; // Puedes devolver la data directamente si solo te interesa el contenido de la respuesta
        } catch (error) {
            throw new Error('Error al cargar días en el calendario');
        }
    },
    CargarAfiliaciones: async () => {
        try {
            debugger
            const sessionString = localStorage.getItem('session');
            const sessionObject = JSON.parse(sessionString);
            const token = sessionObject.token;
            const id = sessionObject.id;

            // El ID debe ser parte del cuerpo de la solicitud como un objeto
            const response = await axios.post('http://localhost:3023/apiDiez/DatosPerfil', { id },
                {
                    headers: {
                        'authorization': `${token}`,
                    },
                });
            return response.data; // Puedes devolver la data directamente si solo te interesa el contenido de la respuesta
        } catch (error) {
            throw new Error('Error al cargar días en el calendario');
        }
    }
};

export default ServiceAfiliadosPerfil;
