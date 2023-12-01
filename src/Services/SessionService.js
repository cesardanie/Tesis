// SessionService.js
const SESSION_KEY = 'session';

const SessionService = {
  // Guardar datos de sesión
  saveSession: (data) => {
  
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  },

  // Obtener datos de sesión
  getSession: () => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  },

  // Eliminar datos de sesión
  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return SessionService.getSession() !== null;
  },

  // Obtener el rol del usuario
  getUserRole: () => {
    const session = SessionService.getSession();
    return session ? session.role : null;
  },
};

export default SessionService;
