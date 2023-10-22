import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Estilos/TablaDatosGerenteStyless.css'

function TablaDatosGerente() {
  const [datos, setDatos] = useState([]);
  const [comentario, setComentario] = useState('');
  
  // Función para obtener los datos de la API
  useEffect(() => {
    async function fetchData() {
      try {
     //const response = await axios.get('URL_DE_LA_API_AQUI');
      //  setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de la API', error);
      }
    }
    
    fetchData();
  }, []);

  const handleAceptar = (id) => {
    // Lógica para aceptar el dato con el ID proporcionado
    // Puedes enviar una solicitud a la API para actualizar el estado del dato
  };

  const handleRechazar = (id) => {
    // Lógica para rechazar el dato con el ID proporcionado
    // Puedes enviar una solicitud a la API para actualizar el estado del dato
  };

  const handleComentarioChange = (event) => {
    setComentario(event.target.value);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.nombre}</td>
              <td>
                <button onClick={() => handleAceptar(dato.id)}>Aceptar</button>
                <button onClick={() => handleRechazar(dato.id)}>Rechazar</button>
                <input
                  type="text"
                  placeholder="Comentario"
                  value={comentario}
                  onChange={handleComentarioChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDatosGerente;
