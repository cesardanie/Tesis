import React, { useState, useEffect } from 'react';
import '../Estilos/TablaStyles.css';
import ServiceNomina from '../Services/ServiceNomina';
import { useHistory } from "react-router";

const PagodeNomina = () => {
  let history = useHistory();
  const [datosCliente, setDatosCliente] = useState([]);

  useEffect(() => {
    ServiceNomina.ObtenerDatosCliente()
      .then((data) => {
        setDatosCliente(data.Datos); // Actualiza el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error('Error al obtener datos del cliente:', error.message);
      });
  }, []); // El segundo parámetro asegura que useEffect solo se ejecute una vez al montar el componente
  const RedireccionarMenu = () => {
    history.push('/Home');
    window.location.reload();
  };
  return (
    <div>
      <h2>Tabla de Datos de pagos de tu Nomina</h2>
      <table>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {datosCliente?.map((dato, index) => (
            <tr key={index}>
              <td>{dato.Mes}</td>
              <td>{dato.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
      <br />
      <br />
    </div>
  );
};

export default PagodeNomina;
