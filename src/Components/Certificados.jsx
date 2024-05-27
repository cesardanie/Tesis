import React, { useState, useEffect } from 'react';
import '../Estilos/CertificadosStyles.css';
import ServicioDedocumentos from '../Services/ServicioDedocumentos';
import { useHistory } from "react-router";


const Certificados = () => {
  let history = useHistory();

  const EventoCertficiado = async (numero, tipo) => {
    try {
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const id = sessionObject.id;
      console.log(tipo);
      const resultado = await ServicioDedocumentos.PostDocumento(id, numero, tipo);
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

  const [certificadoTipo, setCertificadoTipo] = useState(0);
  const [certificadoTipoPension, setCertificadoTipoPension] = useState(0);
  const [certificadoTipotrabajo, setCertificadoTiotrabajo] = useState(0);
  const handleCertificadoChange = (event) => {
    setCertificadoTipo(event.target.value);
  };
  const handleCertificadoChangePension = (event) => {
    setCertificadoTipoPension(event.target.value);
  };
  const handleCertificadoChangetrabajo = (event) => {
    setCertificadoTiotrabajo(event.target.value);
  };

  return (
    <div className="certificados-container">
      <h1>Seleccione el tipo de certificado que desea:</h1>
      <div className="certificado-card">
        <h2>Certificado de Cesantías</h2>
        <select value={certificadoTipo} onChange={handleCertificadoChange}>
          <option value="1">Certificado Completo</option>
          <option value="2">Solo Nombre</option>
        </select>
        <button className="certificado-button" onClick={() => EventoCertficiado(1, certificadoTipo)}>
          Obtener Certificado
        </button>
      </div>
      <div className="certificado-card">
        <h2>Certificado de Pensión</h2>
        <select value={certificadoTipoPension} onChange={handleCertificadoChangePension}>
          <option value="1">Certificado Completo</option>
          <option value="2">Solo Nombre</option>
        </select>
        <button className="certificado-button" onClick={() => EventoCertficiado(2, certificadoTipoPension)}>
          Obtener Certificado
        </button>
      </div>
      <div className="certificado-card">
        <h2>Certificado de Trabajo</h2>
        <select value={certificadoTipotrabajo} onChange={certificadoTipotrabajo}>
          <option value="1">Certificado Completo</option>
          <option value="2">Solo Nombre</option>
        </select>
        <button className="certificado-button" onClick={() => EventoCertficiado(3, certificadoTipotrabajo)}>
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
