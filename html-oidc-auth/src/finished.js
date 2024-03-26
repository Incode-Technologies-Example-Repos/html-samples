import {validateFaceAuthentication, fetchUserInfo} from './oidc';

async function app() {
  const app = document.getElementById('app');
  app.innerHTML = `<h1>Loading...</h1>`;
  
  const code_verifier = localStorage.getItem('code_verifier');
  const state = localStorage.getItem('state');
  if (!code_verifier) {
    app.innerHTML = `<h1>Error: Invalid code_verifier</h1>`;
    return
  }
  try {
    const oidcSession = await validateFaceAuthentication(code_verifier, state);
    app.innerHTML = `<h1>Validated</h1>`;
    console.log({oidcSession});
    const userinfo = await fetchUserInfo(oidcSession);
    console.log(userinfo);
    app.innerHTML = `<h1>User Info:</h1><pre>${JSON.stringify(userinfo, null, '  ')}`;
  }catch(error) {
    app.innerHTML = `<h1>${error}</h1>`;
  }
}

document.addEventListener("DOMContentLoaded", app);