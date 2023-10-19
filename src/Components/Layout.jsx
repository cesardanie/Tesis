// Layout.js (componente de diseño)
import React from 'react';
import '../Estilos/Layout.css'

const Layout = ({ children }) => (
  <div className="layout">
    <header>

    </header>
    <main>
      {children} {/* Contenido específico de la página */}
    </main>

    <footer className="footer">
      <span className="company-name">Plasticos la pradera</span>
    </footer>
  
  </div>
);

export default Layout;
