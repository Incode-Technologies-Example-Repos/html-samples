import {fetchOnboardingUrl} from './onboarding';

async function app() {
  const app = document.getElementById('app');
  const startButton = document.getElementById('start-button');
  
  startButton.addEventListener('click', async ()=>{
    app.innerHTML = `<h1>Loading...</h1>`;
    try {
      const {success, error, url, interviewId, token} = await fetchOnboardingUrl();
      if (success){
        localStorage.setItem("interviewId", interviewId);
        localStorage.setItem("token", token);

        app.innerHTML =`<h1><a href="${url}">Click Here to Continue</a></h1>`;
        window.location.replace(url);
      } else {
        app.innerHTML = `<h1>Error: ${error}</h1>`;
      }
    } catch(e) {
      app.innerHTML = `<h1>Error: ${e.message}</h1>`;
    }
  });
}

document.addEventListener("DOMContentLoaded", app);