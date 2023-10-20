import React, { useEffect } from 'react';
import '../Estilos/Home.css';
import { useHistory } from "react-router";


const Home = () => {
  let history = useHistory ();
const redireccionarDias=()=>{
    history.push('/Calendario');
    window.location.reload();
}
const redireccionarCertificados=()=>{
  history.push('/Certificados');
  window.location.reload();
}
const redireccionarPagodeNomina=()=>{
  history.push('/PagodeNomina');
  window.location.reload();
}
const redireccionarCertificadolaboral=()=>{
  history.push('/CertificadoLaboral');
  window.location.reload();
}
  return (
    <div className="home-container">
      <h1>Bienvenido al Menú principal</h1>
      <br />
      <div className="options-container">
      <div className="option option-1">
            <h2>Gestionar días de permiso</h2>
            <p>En esta parte encontrarás el calendario para agendar los días de permiso que quisieras tener</p>
            <button className="button" onClick={redireccionarDias}>
                Gestionar Días
              </button>
        </div>
        <div className="option option-2"> {/* Clase de estilo única para la opción 2 */}
          <h2>Certificados</h2>
          <p>En esta Opcion podra sacar los certiicados de cesantias y pension.</p>
          <button className="button" onClick={redireccionarCertificados}>
               Certificados
            </button>
        </div>
        <div className="option option-3"> {/* Clase de estilo única para la opción 3 */}
          <h2>Pagos de Nomina</h2>
          <p>En esta opcion se mostrara los pagos de nomina del empleado que esta autenticado</p>
          <button className="button" onClick={redireccionarPagodeNomina}>
               Pagos de Nomina
            </button>
        </div>
        <div className="option option-4"> {/* Clase de estilo única para la opción 4 */}
          <h2>Certificados laborales</h2>
          <p>En esta Opcion se expediran certificados laborales</p>
          <button className="button" onClick={redireccionarCertificadolaboral}>
               Certificados laborales
            </button>
        </div>
        <div className="option option-5"> {/* Clase de estilo única para la opción 5 */}
          <h2>Cambio de cuenta bancaria</h2>
          <p>el cambio de la cuenta bancaria a otro banco</p>
          <button className="button"> {/* Agrega una clase de estilo para los botones */}
             cambio de cuenta
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
