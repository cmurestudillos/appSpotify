// Credenciales de acceso
import access from '../app/api/access';

export const environment = {
  production: false,
  clientID: access.ANGULAR_APP_CLIENTID,
  clientSECRET: access.ANGULAR_APP_CLIENTSECRET,
  urlWeb: access.ANGULAR_APP_URL_WEB
};

