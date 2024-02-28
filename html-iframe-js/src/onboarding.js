const tokenServerURL=import.meta.env.VITE_TOKEN_SERVER_URL;

export async function fetchOnboardingStatus(interviewId) {
  const response = await fetch(`${tokenServerURL}/onboarding-status?interviewId=${interviewId}`,{});
  return await response.json();
}

export async function fetchScore(interviewId, token) {
  const response = await fetch(`${tokenServerURL}/fetch-score`, {method:'POST',body: JSON.stringify({interviewId, token})});
  return await response.json();
}

export async function fetchOnboardingUrl() {
  const response = await fetch(`${tokenServerURL}/onboarding-url`,{});
  return await response.json();
}
