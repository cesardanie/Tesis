import React, { useEffect, useState } from 'react';
import ServiceCalendario from '../Services/ServiceCalendario';

const DataTable = () => {
  const [dias, setDias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const id=sessionObject.id;
        const response = await ServiceCalendario.ExtraerDias(id);
        console.log(response);
        setDias(response.data);
      } catch (error) {
        console.error('Error al obtener días:', error.message);
      }
    };

    fetchData();
  }, []);
  const formatFecha = (fecha) => {
    const dateObj = new Date(fecha);
    const dia = dateObj.getDate();
    const mes = dateObj.getMonth() + 1; // Los meses comienzan desde 0, por eso sumamos 1
    const año = dateObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  };
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
              <td>{formatFecha(entry.DiaInicial)}</td>
              <td>{formatFecha(entry.Diafinal)}</td>
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
