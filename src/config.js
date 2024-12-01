const CONFIG = {
    API_BASE_URL:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_BASE_URL_PROD
        : process.env.REACT_APP_API_BASE_URL_DEV,
    ENCRYPTION_KEY: process.env.REACT_APP_MY_KEY,
  };
  
  export default CONFIG;
  