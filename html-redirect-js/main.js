import './style.css'
async function fetchOnboardingUrl() {
  const redirectUrl=import.meta.env.VITE_REDIRECT_URL
  
  const response = await fetch(
    "https://192.168.100.69:3001/onboarding-url?redirectUrl="+encodeURIComponent(redirectUrl),
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
     //window.location.replace(onboardingUrl);
  } catch(e) {
    app.innerHTML = e.message;
  } 
}

document.addEventListener("DOMContentLoaded", app);