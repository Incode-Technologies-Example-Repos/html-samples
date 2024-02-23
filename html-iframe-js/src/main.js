import { fetchOnboardingStatus, fetchOnboardingUrl } from './onboarding';

const createIframe = (config) => {
  // Dynamically create the iframe
  const frame = document.createElement('iframe');
  frame.src = config.url;
  frame.class = 'onboarding-view'
  frame.id = 'app-frame'
  frame.width = '100%';
  frame.height = '100%';
  frame.allowUserMedia = true;
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('allow', 'geolocation; microphone; camera;');
  app.appendChild(frame);
}

async function app() {
  const app = document.getElementById('app');
  app.innerHTML = "Loading...";
  
  try {
    const config = await fetchOnboardingUrl();
    createIframe(config);

    try {
      const interval = setInterval(async () => {
        const {success, finished, error } = await fetchOnboardingStatus(interviewId);
        if (success===true && finished===true){
          clearInterval(interval);
          app.innerHTML =`Onboarding Finished!`;
        } else if(success===false){
          clearInterval(interval);
          app.innerHTML =`There was an error: ${error}`;
        }
      }, 2000);
    } catch(e) {
      app.innerHTML = e.message;
    } 

  } catch(e) {
    app.innerHTML = e.message;
  } 
}

document.addEventListener("DOMContentLoaded", app);
