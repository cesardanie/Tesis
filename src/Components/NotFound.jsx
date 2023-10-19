import React from 'react';

const notFoundStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  };
  const NotFound = () => {
    return (
      <div style={notFoundStyle}>
        <h2>La vista que estás buscando no existe</h2>
        <p>Por favor, verifica la URL e intenta nuevamente.</p>
      </div>
    );
  };

export default NotFound;