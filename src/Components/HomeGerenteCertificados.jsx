import React, { useState } from 'react';
import Firma from './Componente/Firma';
import { useHistory } from "react-router";

const HomeGerenteCertificados = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  let history = useHistory();
  const handleOpcionSeleccionada = (opcion) => {
    setOpcionSeleccionada(opcion);
  };
  const RedireccionarMenu = () => {
    history.push('/Gerente');
    window.location.reload();
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
      <br />
      <br />
      <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
      <br />
      <br />
    </div>
  );
};

export default HomeGerenteCertificados;
