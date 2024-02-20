import './style.css'
async function fetchOnboardingUrl() {
  const tokenServerURL=import.meta.env.VITE_TOKEN_SERVER_URL;
  const response = await fetch(
    `${tokenServerURL}/onboarding-url`,
    {},
  );
  
  const data = await response.json();
  return data.url;
}

async function app() {
  const app = document.getElementById('app');
  app.innerHTML = "Loading...";
  try {
    const onboardingUrl = await fetchOnboardingUrl();
    app.innerHTML =`<a href="${onboardingUrl}">Click Here to Continue</a>`;
    window.location.replace(onboardingUrl);
  } catch(e) {
    app.innerHTML = e.message;
  } 
}

document.addEventListener("DOMContentLoaded", app);