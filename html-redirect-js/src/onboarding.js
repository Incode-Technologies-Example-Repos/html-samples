const tokenServerURL=import.meta.env.VITE_TOKEN_SERVER_URL;

export async function fetchScore(interviewId) {
    const response = await fetch(`${tokenServerURL}/fetch-score=?interviewId=${interviewId}`, {});
    return await response.json();
  }

export async function fetchOnboardingUrl() {
    const response = await fetch(`${tokenServerURL}/onboarding-url`,{});
    return await response.json();
}
