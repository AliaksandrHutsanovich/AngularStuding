import { environment } from '../../environments/environment';

let HOST = 'http://localhost:3000';
if (environment.production) {
  HOST = 'https://backend-for-angular-8-app.herokuapp.com';
}
export const DEPLOY_URL = '/user-interface';

export default HOST;
