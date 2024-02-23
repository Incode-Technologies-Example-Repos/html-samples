import { fetchOnboardingStatus, fetchOnboardingUrl } from './onboarding';

const createIframe = (url) => {
  const app = document.getElementById('app');
  // Dynamically create the iframe
  const frame = document.createElement('iframe');
  frame.src = url;
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
  
  
  try {
    const {url, interviewId} = await fetchOnboardingUrl();
    app.innerHTML = "";
    createIframe(url);

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
      }, 1000);
    } catch(e) {
      app.innerHTML = e.message;
    } 

  } catch(e) {
    app.innerHTML = e.message;
  } 
}

document.addEventListener("DOMContentLoaded", app);
