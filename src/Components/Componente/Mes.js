// Mes.js
import React from 'react';

const Mes = ({ nombreMes, seleccionado, onSeleccionar }) => (
  <div onClick={() => onSeleccionar(nombreMes)}>
    {nombreMes} {seleccionado ? 'X' : ''}
  </div>
);

export default Mes;
