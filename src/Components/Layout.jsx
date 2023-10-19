// Layout.js (componente de diseño)
import React from 'react';

const Layout = ({ children }) => (
  <div>
    <header>

    </header>
    <main>
      {children} {/* Contenido específico de la página */}
    </main>
    <footer>
      {/* Pie de página */}
    </footer>
  </div>
);

export default Layout;
