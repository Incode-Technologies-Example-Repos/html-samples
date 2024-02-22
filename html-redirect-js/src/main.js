import {fetchOnboardingUrl} from './onboarding';

async function app() {
  const app = document.getElementById('app');
  app.innerHTML = "Loading...";
  try {
    const {url} = await fetchOnboardingUrl();
    app.innerHTML =`<a href="${url}">Click Here to Continue</a>`;
    window.location.replace(url);
  } catch(e) {
    app.innerHTML = e.message;
  } 
}

document.addEventListener("DOMContentLoaded", app);