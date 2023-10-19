import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Estilos por defecto
import '../Estilos/CalendarStyles.css'; // Importa tus estilos CSS

const DateRangePicker = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  return (
    <div className="calendar-container">
      <h2>Seleccionar un rango de fechas</h2>
      <DateRange ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  );
};

export default DateRangePicker;
