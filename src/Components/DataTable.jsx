import React, { useEffect, useState } from 'react';
import ServiceCalendario from '../Services/ServiceCalendario';

const DataTable = () => {
  const [dias, setDias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ServiceCalendario.ExtraerDias();
        console.log(response);
        setDias(response.data);
      } catch (error) {
        console.error('Error al obtener días:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Estado de Solicitudes</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha de inicio</th>
            <th>Fecha de fin</th>
            <th>Observaciones</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {dias.map((entry, index) => (
            <tr key={index}>
              <td>{entry.DiaInicial}</td>
              <td>{entry.Diafinal}</td>
              <td>{entry.Observacion}</td>
              <td>{entry.Estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
