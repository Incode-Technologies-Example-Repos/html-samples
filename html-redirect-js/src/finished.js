import {fetchOnboardingStatus} from './onboarding';

async function app() {
  const app = document.getElementById('app');
  
  const urlParams = new URLSearchParams(window.location.search);
  const interviewId = urlParams.get('interviewId');
  const flowId = urlParams.get('flowId');
  
  app.innerHTML = `Waiting for the Onboarding status for interviewId: ${interviewId}`;
  
  try {
    const interval = setInterval(async ()=>{
      const {success, finished, error } = await fetchOnboardingStatus(interviewId);
      if (success===true && finished===true){
        clearInterval(interval);
        app.innerHTML =`Onboarding Finished!`;
      } else if(success===false){
        clearInterval(interval);
        app.innerHTML =`There was an error: ${error}`;
      }
    }, 1000);
    
    app.innerHTML =`Waiting for onboarding to finish!`;
  } catch(e) {
    app.innerHTML = e.message;
  } 
}

document.addEventListener("DOMContentLoaded", app);