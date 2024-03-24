import React, { useState, useEffect } from 'react';
import '../Estilos/CertificadosStyles.css';
import ServicioDedocumentos from '../Services/ServicioDedocumentos';
import { useHistory } from "react-router";


const Certificados = () => {
  let history = useHistory();
  const EventoCertficiado = async (numero) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const id = sessionObject.id;
      const resultado = await ServicioDedocumentos.PostDocumento(id,numero);
      window.open(resultado.objectUrl);
    } catch (error) {
      console.error('Error al obtener el certificado:', error);
    }
  };
  const RedireccionarMenu = () => {
    history.push('/Home');
    window.location.reload();
  };
  useEffect(() => {
    // Puedes realizar alguna acción adicional al cargar el componente si es necesario
  }, []);

  return (
    <div className="certificados-container">
      <h1>Seleccione el tipo de certificado que desea:</h1>
      <div className="certificado-card">
        <h2>Certificado de Cesantías</h2>
        <button className="certificado-button" onClick={() => EventoCertficiado(1)}>
          Obtener Certificado
        </button>
      </div>
      <div className="certificado-card">
        <h2>Certificado de Pensión</h2>
        <button className="certificado-button" onClick={() => EventoCertficiado(2)}>
          Obtener Certificado
        </button>
      </div>
      <div className="certificado-card">
        <h2>Certificado de Trabajo</h2>
        <button className="certificado-button" onClick={() => EventoCertficiado(3)}>
          Obtener Certificado
        </button>
      </div>
      <div className="certificado-card">
        <h2>Menu Principal</h2>
        <button className="certificado-button" onClick={RedireccionarMenu}>
          Menu Principal 
        </button>
      </div>
    </div>
  );
};

export default Certificados;
