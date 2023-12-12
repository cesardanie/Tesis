import React, { useState } from 'react';
import Firma from './Componente/Firma';

const HomeGerenteCertificados = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const handleOpcionSeleccionada = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Bienvenido Gerente</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
        <button onClick={() => handleOpcionSeleccionada('firmar')}>Firmar Documentos</button>
        <button onClick={() => handleOpcionSeleccionada('autorizar')}>Autorizar Documentos</button>
      </div>

      {opcionSeleccionada === 'firmar' && (
        <div>
          <h2>Firma de Documentos</h2>
          <Firma onFirmaListo={(firmaBase64) => console.log('Firma lista:', firmaBase64)} />
        </div>
      )}

      {opcionSeleccionada === 'autorizar' && (
        <div>
          <h2>Autorización de Documentos</h2>
          {/* Agrega aquí el contenido o componente para autorizar documentos */}
          <p>Contenido de autorización de documentos...</p>
        </div>
      )}
    </div>
  );
};

export default HomeGerenteCertificados;
