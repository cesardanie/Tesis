import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import '../Estilos/HomeGerenteStyless.css';
import SessionService from '../Services/SessionService';

const HomeGerente = () => {
  let history = useHistory();

  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const storedSession = SessionService.getSession();
    setSessionData(storedSession);
  }, []);

  const redireccionarDias = () => {
    history.push('/GerenteDias');
    window.location.reload();
  };

  const redireccionarCertificados = () => {
    history.push('/ModuloGerenteCertificado');
    window.location.reload();
  };

  const redireccionarPagodeNomina = () => {
    history.push('/ModulodepagodenominaGerente');
    window.location.reload();
  };

  const RedireccionarTabladeUsuarios = () => {
    history.push('/TabladeUsuarios');
    window.location.reload();
  };

  const RedireccionarTabladeCuentaBancaria = () => {
    history.push('/CuentaBancariaGerente');
    window.location.reload();
  };

  const RedireccionarMovilidadInterna = () => {
    history.push('/MovilidadInternaGerente');
    window.location.reload();
  };
  const Redireccionarafiliaciones = () => {
    history.push('/AfilicacionesGerente');
    ///AfilicacionesGerente
    window.location.reload();
  };

  const cerrarSesion = () => {
    SessionService.clearSession();
    history.push('/');
    window.location.reload();
  };

  return (
    <div className="home-container">
      <h1>Bienvenido al Menú principal</h1>
      <br />
      <div className="options-container">
        <div className="option">
          <h2>Permisos de los empleados</h2>
          <p>En esta parte encontrarás todas las solicitudes de permisos agendadas de los colaboradores y podrás autorizar</p>
          <button className="button option" onClick={redireccionarDias}>
            Gestionar Días
          </button>
        </div>
        <div className="option">
          <h2>Certificados</h2>
          <p>En esta Opción podrá poner la firma y autorizar los certificados de tus colaboradores.</p>
          <button className="button option" onClick={redireccionarCertificados}>
            Certificados
          </button>
        </div>
        <div className="option">
          <h2>Pagos de Nómina</h2>
          <p>En esta opción se gestionará el pago de nómina de los empleados</p>
          <button className="button option" onClick={redireccionarPagodeNomina}>
            Pagos de Nómina
          </button>
        </div>
        <div className="option">
          <h2>Cambio de cuenta bancaria</h2>
          <p>El cambio de la cuenta bancaria a otro banco o la creación de la misma</p>
          <button className="button option" onClick={RedireccionarTabladeCuentaBancaria}>
            Cambio de cuenta
          </button>
        </div>
        <div className="option">
          <h2>Agregar Empleados</h2>
          <p>En este módulo se podrá agregar empleados nuevos y eliminar usuarios que ya no trabajen en la empresa</p>
          <button className="button option" onClick={RedireccionarTabladeUsuarios}>
            Ingresar
          </button>
        </div>
        <div className="option">
          <h2>Movilidad Interna</h2>
          <p>Gestiona las solicitudes de cambios de posición o área dentro de la empresa crea solicitudes para la empresa.</p>
          <button className="button option" onClick={RedireccionarMovilidadInterna}>
            Movilidad Interna
          </button>
        </div>
        <div className="option">
          <h2>Afiliciones</h2>
          <p>Gestiona las solicitudes de cambio de las afilicaciones.</p>
          <button className="button option" onClick={Redireccionarafiliaciones}>
            Movilidad Interna
          </button>
        </div>
      </div>
      <button className="button" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default HomeGerente;
