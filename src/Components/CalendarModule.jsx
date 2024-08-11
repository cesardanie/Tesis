import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import ServiceCalendario from '../Services/ServiceCalendario';
import { useHistory } from "react-router";
import DataTable from './DataTable';
import '../Estilos/CalendarStyles.css';

const CalendarModule = () => {
  let history = useHistory();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Aquí puedes enviar los datos al servidor o realizar cualquier acción necesaria
    const data = {
      startDate,
      endDate,
      observaciones,
      Estado: 'Pendiente',
    };
  
    try {
      debugger
      const response = await ServiceCalendario.CargarDias(data);
      if(response.Estado==true)
      {
        window.alert("Se agrego con exito sus dias de permiso");
        setStartDate('');
        setEndDate('');
        setObservaciones('');
        history.push('/Home');
        window.location.reload();
      }
      if(response.Estado==false)
      {
        window.alert("no se puedo realizar su peticion");
        setStartDate('');
        setEndDate('');
        setObservaciones('');
      }
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error.message);
    }
  
    console.log('Datos enviados:', data);
  };
  const RedireccionarMenu = () => {
    history.push('/Home');
    window.location.reload();
  };

  return (
    <div className="larger-calendar-container">
      <h1>Seleccionar un rango de fechas</h1>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-group">
          <label>Fecha de inicio:</label>
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Fecha de fin:</label>
          <input
            type="date"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Observaciones de sus vacaciones o incapacidad o si necesita vacaciones reintegradas</label>
          <textarea
            value={observaciones || ''}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit">
          Enviar Formulario
        </button>
      </form>
      <DataTable />
      <br />
      <br />
      <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
      <br />
      <br />
    </div>
  );
};

export default CalendarModule;
