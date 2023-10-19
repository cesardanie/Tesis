import React, { useEffect } from 'react';
import '../Estilos/Home.css';


const Home = () => {

  
  return (
    <div className="home-container">
      <h1>Bienvenido al Menú principal</h1>
      <br />
      <div className="options-container">
      <div className="option option-1">
            <h2>Gestionar días de permiso</h2>
            <p>En esta parte encontrarás el calendario para agendar los días de permiso que quisieras tener</p>
            <button className="button"> {/* Agrega una clase de estilo para los botones */}
                Gestionar Días
            </button>
        </div>
        <div className="option option-2"> {/* Clase de estilo única para la opción 2 */}
          <h2>Certificados</h2>
          <p>En esta Opcion podra sacar los certiicados de cesantias y pension.</p>
          <button className="button"> {/* Agrega una clase de estilo para los botones */}
                Gestionar Días
            </button>
        </div>
        <div className="option option-3"> {/* Clase de estilo única para la opción 3 */}
          <h2>Opción 3</h2>
          <p>Descripción de la opción 3.</p>
        </div>
        <div className="option option-4"> {/* Clase de estilo única para la opción 4 */}
          <h2>Opción 4</h2>
          <p>Descripción de la opción 4.</p>
        </div>
        <div className="option option-5"> {/* Clase de estilo única para la opción 5 */}
          <h2>Opción 5</h2>
          <p>Descripción de la opción 5.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
