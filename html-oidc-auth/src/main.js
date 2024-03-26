import {fetchAuthenticationUrl} from './oidc';

async function app() {
  console.log('running app')
  const app = document.getElementById('app');
  app.innerHTML = `<h1>Loading...</h1>`;
  try {
    const {url, code_verifier, state} = await fetchAuthenticationUrl();
    localStorage.setItem("code_verifier", code_verifier);
    localStorage.setItem("state", state);
    app.innerHTML =`<h1><a href="${url}">Click Here to Continue</a></h1>`;
  } catch(e) {
    app.innerHTML = `<h1>Error: ${e.message}</h1>`;
  } 
}

document.addEventListener("DOMContentLoaded", app);