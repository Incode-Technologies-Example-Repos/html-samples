import {fetchAuthenticationUrl} from './oidc';

async function app() {
  const identityIdInput = document.getElementById('identityid-input');
  const acceptButton = document.getElementById('accept-button');
  const app = document.getElementById('app');
  
  acceptButton.addEventListener('click', async () => {
    try {
      const identityId = identityIdInput.value;
      const {url, code_verifier, state} = await fetchAuthenticationUrl(identityId);
      localStorage.setItem("code_verifier", code_verifier);
      localStorage.setItem("state", state);
      app.innerHTML =`<h1><a href="${url}">Click Here to Continue</a></h1>`;
      //window.location.replace(url);
    } catch(e) {
      app.innerHTML = `<h1>Error: ${e.message}</h1>`;
    } 
  })
}

document.addEventListener("DOMContentLoaded", app);
