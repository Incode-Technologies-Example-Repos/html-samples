import '/src/styles/style.css'

// Application varables set via Vite and .env file
const apiUrl = import.meta.env.VITE_INCODE_API_URL;
const serverUrl = import.meta.env.VITE_YOUR_COMPANY_SERVER;

let interval = null;

const app = document.getElementById('app');

const doGet = async (url, params, header) => {
  // Utility method for making GET requests
  if (params) {
    url = `${url}?` + new URLSearchParams(params);
  }
  try {
    const response = await fetch(url, { headers: header });
    return response.json();
  } catch (e) {
    console.log(`Error:  HTTPGET error.`, e);
  }
}

const getHeaders = (config) => {
  // Required headers per Incode API
  return {
    'Content-Type': 'application/json',
    'X-Incode-Hardware-Id': config.token,
    'api-version': '1.0'
  }
}

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

const poll = async (config) => {
  // Poll for onboarding finished status
  const results = await doGet(`${apiUrl}/0/omni/get/onboarding/status`, { id: config.id }, getHeaders());
  if (results.onboardingStatus === 'ONBOARDING_FINISHED') {
    clearInterval(interval);
    clear(app);
    finish();
  }
}

const clear = async (el) => {
  // Clear iframe because onboarding has finished
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

const finish = (el)=> {
  //  Updates the UI after onboarding has finished
  const paragraph = document.createElement('p');
  paragraph.textContent = "Ok, finished.";
  app.appendChild(paragraph);
}

window.onload = async () => {
  // Start session and get onboarding URL from server
  const config = await doGet(`${serverUrl}/onboarding-url`, null, {
    'ngrok-skip-browser-warning': 'ok',
  });

  if (config?.url && config?.token && config?.interviewId) {
    createIframe(config);
    // Poll every two seconds
    interval = setInterval(poll, 2000, config);
  } else {
    console.log(`Error:  Config error.`, e);
  }
};
