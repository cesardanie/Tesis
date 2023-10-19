import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';

const CalendarModule = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [observaciones, setObservaciones] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Aquí puedes enviar los datos al servidor o realizar cualquier acción necesaria
    const data = {
      startDate,
      endDate,
      observaciones
    };
    console.log('Datos enviados:', data);
  };

  return (
    <div className="calendar-container">
      <h1>Seleccionar un rango de fechas</h1>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-group">
          <label>Fecha de inicio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Fecha de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Observaciones de sus vacaciones</label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit">
          Enviar Formulario
        </button>
      </form>
    </div>
  );
};

export default CalendarModule;
