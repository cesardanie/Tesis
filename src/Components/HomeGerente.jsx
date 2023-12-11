import React, { useEffect,useState } from 'react';
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
  }

  const redireccionarCertificados = () => {
    history.push('/Certificados');
    window.location.reload();
  }

  const redireccionarPagodeNomina = () => {
    history.push('/PagodeNomina');
    window.location.reload();
  }
  const RedireccionarTabladeUsuarios=()=>
  {
    history.push('/TabladeUsuarios');
    window.location.reload();
  }
  const RedireccionarTabladeCuentaBancaria=()=>
  {
    history.push('/CuentaBancariaGerente');
    window.location.reload();
  }
  const cerrarSesion = () => {
    // Eliminar datos de la sesión al hacer clic en cerrar sesión
    SessionService.clearSession();
    // Redirigir a la página de inicio de sesión u otra página
    history.push('/');
    window.location.reload();

  }


  return (
    <div className="home-container">
      <h1>Bienvenido al Menú principal</h1>
      <br />
      <div className="options-container">
        <div className="option">
          <h2>Permisos de los empleados</h2>
          <p>En esta parte encontrarás todas las solicitudes de permisos agendadas</p>
          <button className="button option" onClick={redireccionarDias}>
            Gestionar Días
          </button>
        </div>
        <div className="option">
          <h2>Certificados</h2>
          <p>En esta Opcion podra poner la firma y autorizar los certificados .</p>
          <button className="button option" onClick={redireccionarCertificados}>
            Certificados
          </button>
        </div>
        <div className="option">
          <h2>Pagos de Nomina</h2>
          <p>En esta opcion se mostrara los pagos de nomina del empleado que esta autenticado</p>
          <button className="button option" onClick={redireccionarPagodeNomina}>
            Pagos de Nomina
          </button>
        </div>
        <div className="option">
          <h2>Certificados laborales</h2>
          <p>En esta Opcion se expediran certificados laborales</p>
          <button className="button option">
            Certificados laborales
          </button>
        </div>
        <div className="option">
          <h2>Cambio de cuenta bancaria</h2>
          <p>el cambio de la cuenta bancaria a otro banco</p>
          <button className="button option" onClick={RedireccionarTabladeCuentaBancaria}>
            cambio de cuenta
          </button>
        </div>
        <div className="option">
          <h2>Agregar Empleados</h2>
           <p>En este modulo se podra gregar empleados nuevos y eliminar usuarios que ya no trabajen en la empresa </p>
           <button className="button option" onClick={RedireccionarTabladeUsuarios}>
            Ingresar
          </button>
        </div>
      </div>
                    {/* Agregar el botón de cerrar sesión */}
        <button className="button" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
    </div>
  );

}

export default HomeGerente;
