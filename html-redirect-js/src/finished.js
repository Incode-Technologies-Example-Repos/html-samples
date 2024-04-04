import {fetchScore} from './onboarding';

async function app() {
  const app = document.getElementById('app');
  app.innerHTML = `<h1>Loading...</h1>`;
  
  const interviewId = localStorage.getItem('interviewId');
   if (!interviewId) {
    app.innerHTML = `<h1>Error: Invalid interviewId</h1>`;
  }
  const token = localStorage.getItem('token');

  const score = await fetchScore(interviewId, token);
  
  if(score.success){
    app.innerHTML =`<h1>Onboarding finished with score: ${score.score}</h1>`;
  } else {
    app.innerHTML = `<h1>Error: ${score.error}</h1>`;
  } 
}

document.addEventListener("DOMContentLoaded", app);