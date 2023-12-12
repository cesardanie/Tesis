import React, { useState, useEffect } from 'react';
import '../Estilos/TablaStyles.css';
import ServiceNomina from '../Services/ServiceNomina';

const PagodeNomina = () => {
  const [datosCliente, setDatosCliente] = useState([]);

  useEffect(() => {
    ServiceNomina.ObtenerDatosCliente()
      .then((data) => {
        setDatosCliente(data); // Actualiza el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error('Error al obtener datos del cliente:', error.message);
      });
  }, []); // El segundo parámetro asegura que useEffect solo se ejecute una vez al montar el componente

  return (
    <div>
      <h2>Tabla de Datos del Cliente</h2>
      <table>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {datosCliente.map((dato, index) => (
            <tr key={index}>
              <td>{dato.Mes}</td>
              <td>{dato.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PagodeNomina;
