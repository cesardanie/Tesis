const AuthServiceToken = {
    
    isLoggedIn: () => {
        const sessionString = localStorage.getItem('session');
        if(sessionString)
        {
            const sessionString = localStorage.getItem('session');
            const sessionObject = JSON.parse(sessionString);
            const token = sessionObject.token;
            console.log(token);
            const isLoggedIn = token !== null;
            if (!sessionObject || !sessionObject.token) {
                console.error('No se encontró un token en el almacenamiento local o es null.');
                return false;
              }
            if(isLoggedIn==true)
            {
                console.log('isLoggedIn:', isLoggedIn);
                return true ;
            }
        }
    },
    getRole: () => {
        const sessionString = localStorage.getItem('session');
        if(sessionString)
        {
            const sessionObject = JSON.parse(sessionString);
            const roles = sessionObject.role;
            if(roles!=null)
            {
                return roles;
            }else{
                console.error('No se encontró un rol');
                return null; 
            }
        }

       
    },
    getEstado: () => {
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const estado1 = sessionObject.estado;
      const estado = estado1 === 'true';
      return estado;
    },
    getToken: () => {
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        return sessionObject ? sessionObject.token : null;
    },
  };
  
  export default AuthServiceToken;