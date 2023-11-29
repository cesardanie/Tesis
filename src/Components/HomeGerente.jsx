import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import '../Estilos/HomeGerenteStyless.css';

var Rol = localStorage.getItem('role');
var token = localStorage.getItem('token');
var estado=localStorage.getItem('estado')
const HomeGerente = () => {
  let history = useHistory();

  const redireccionarDias = () => {
    history.push('/Calendario');
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
  const cerrarSesion = () => {
    // Eliminar datos de la sesión al hacer clic en cerrar sesión
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('estado');
  
    // Redirigir a la página de inicio de sesión u otra página
    history.push('/');
    window.location.reload();
  }
if((Rol==='Administrador') &&(token!=undefined)&&(estado==='true'))
{
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
          <button className="button option">
            cambio de cuenta
          </button>
        </div>
        <div className="option">
          <h2>Agregar Empleados</h2>
           <p>En este modulo se podra gregar empleados nuevos y eliminar usuarios que ya no trabajen en la empresa </p>
          <button className="button option">
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
else{
  return (
    <div className="home-container">
      <h1>No tienes permisos de administrador.</h1>
      {/* Puedes agregar más contenido o redireccionar a otra página */}
    </div>
  );
}

};

export default HomeGerente;
