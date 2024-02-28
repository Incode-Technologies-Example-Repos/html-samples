import {fetchOnboardingUrl} from './onboarding';

async function app() {
  const app = document.getElementById('app');
  app.innerHTML = "Loading...";
  try {
    const {success, error, url, interviewId} = await fetchOnboardingUrl();
    if (success){
      localStorage.setItem("interviewId", interviewId);
      
      app.innerHTML =`<a href="${url}">Click Here to Continue</a>`;
      window.location.replace(url);
    } else {
      app.innerHTML = `<h1>Error: ${error}</h1>`;
    }
  } catch(e) {
    app.innerHTML = `<h1>Error: ${e.message}</h1>`;
  } 
}

document.addEventListener("DOMContentLoaded", app);