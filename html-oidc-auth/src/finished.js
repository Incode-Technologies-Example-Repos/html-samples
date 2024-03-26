import {validateFaceAuthentication} from './oidc';

async function app() {
  //const urlParams = new URLSearchParams(window.location.search);
  const app = document.getElementById('app');
  app.innerHTML = `<h1>Loading...</h1>`;
  
  //const code = urlParams.get("code");
  const code_verifier = localStorage.getItem('code_verifier');
  const state = localStorage.getItem('state');
  if (!code_verifier) {
    app.innerHTML = `<h1>Error: Invalid code_verifier</h1>`;
    return
  }
  try {
    const validation = await validateFaceAuthentication(code_verifier, state);
    app.innerHTML = `<h1>Validated</h1>`;
    console.log({validation});
  }catch(error) {
    app.innerHTML = `<h1>${error}</h1>`;
  }
}

document.addEventListener("DOMContentLoaded", app);