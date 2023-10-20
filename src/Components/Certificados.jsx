import React from 'react';
import '../Estilos/CertificadosStyles.css'; // Importa tus estilos CSS

const Certificados = () => {
  return (
    <div className="certificados-container">
      <h1>Seleccione el tipo de certificado que desea:</h1>
      <div className="certificado-card">
        <h2>Certificado de Cesantías</h2>
        <button className="certificado-button">Obtener Certificado</button>
        <button className="certificado-button">Previsualizar certificado</button>
      </div>
      <div className="certificado-card">
        <h2>Certificado de Pensión</h2>
        <button className="certificado-button">Obtener Certificado</button>
        <button className="certificado-button">Previsualizar certificado</button>
      </div>
    </div>
  );
};

export default Certificados;