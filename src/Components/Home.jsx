import React, { useEffect, useState } from 'react';
import '../Estilos/Home.css';
import { useHistory } from "react-router";
import SessionService from '../Services/SessionService';
import Servicehojadevida from '../Services/Servicehojadevida';

const Home = () => {
  let history = useHistory();
  const [file, setFile] = useState(null);

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

  const redireccionarCertificadolaboral = () => {
    history.push('/CertificadoLaboral');
    window.location.reload();
  }

  const redireccionarCuentaBancaria = () => {
    history.push('/CuentaBanco');
    console.log("se dio click")
    window.location.reload();
  }
  const redireccionarperfilafiliaciones = () => {
    history.push('/PerfilAfilaciones');
    console.log("se dio click")
    window.location.reload();
  }

  const redireccionaportesvoluntarios = () => {
    history.push('/aportesvoluntarios');
    window.location.reload();
  }
  const redireccionamovilidadinterna = () => {
    history.push('/MovilidadInterna');
    window.location.reload();
  }
  const cerrarSesion = () => {
    // Eliminar datos de la sesión al hacer clic en cerrar sesión
    SessionService.clearSession();
    // Redirigir a la página de inicio de sesión u otra página
    history.push('/');
    window.location.reload();
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleFileUpload = async () => {
    if (!file) {
      console.log("No se ha seleccionado ningún archivo.");
      return;
    }

    console.log("entro", file);
    const formData = new FormData();
    const sessionString = localStorage.getItem('session');
    const sessionObject = JSON.parse(sessionString);
    const id = sessionObject.id;
    formData.append('id', id);
    formData.append('file', file);
    const respuestaServicio = await Servicehojadevida.PostHojadevida(formData);
    console.log(respuestaServicio);
  }

  return (
    <div className="home-container">
      <h1>Bienvenido al Menú principal</h1>
      <br />
      <div className="options-container">
        <div className="option">
          <h2>Gestionar días de permiso o incapacidad</h2>
          <p>En esta sección, los usuarios encontrarán el calendario para agendar los días de permiso que deseen, o la gestion de incapcadidades y excusas medicas</p>
          <button className="button" onClick={redireccionarDias}>
            Gestionar Días
          </button>
        </div>
        <div className="option option-2"> {/* Clase de estilo única para la opción 2 */}
          <h2>Certificados</h2>
          <button className="button" onClick={redireccionarCertificados}>
            Certificados
          </button>
        </div>
        <div className="option option-3"> {/* Clase de estilo única para la opción 3 */}
          <h2>Pagos de Nomina</h2>
          <p>En esta opción, se mostrarán los pagos de nómina del empleado autenticado.</p>
          <button className="button" onClick={redireccionarPagodeNomina}>
            Pagos de Nomina
          </button>
        </div>
        <div className="option option-5"> {/* Clase de estilo única para la opción 5 */}
          <h2>Cambio de cuenta bancaria</h2>
          <p>el cambio de la cuenta bancaria a otro banco</p>
          <button className="button" onClick={redireccionarCuentaBancaria}>
            Cambio de cuenta
          </button>
        </div>
        <div className="option option-6"> {/* Clase de estilo única para la opción 6 */}
          <h2>Cargar Hoja de Vida</h2>
          <p>En esta sección, los usuarios podrán cargar sus hojas de vida.</p>
          <input type="file" onChange={handleFileChange} />
          <button className="button" onClick={handleFileUpload}>Subir</button>
        </div>
      </div>
      <div className="options-container">
        <div className="option option-5"> {/* Clase de estilo única para la opción 5 */}
          <h2>Movilidad Interna</h2>
          <p>Contribuciones adicionales que los empleados deciden hacer, generalmente a fondos de pensiones o a otros tipos de ahorro voluntario</p>
          <button className="button" onClick={redireccionamovilidadinterna}>
            Movilidad Interna
          </button>
        </div>
        <div className="option option-5"> {/* Clase de estilo única para la opción 5 */}
          <h2>Perfil, Afilaciones y Aportes voluntarios</h2>
          <p>Contribuciones adicionales que los empleados deciden hacer, generalmente a fondos de pensiones o a otros tipos de ahorro voluntario.</p>
          <button className="button" onClick={redireccionarperfilafiliaciones}>
            Afiliaciones
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

export default Home;
