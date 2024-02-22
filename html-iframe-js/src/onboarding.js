export async function fetchOnboardingStatus(interviewId) {
    const tokenServerURL=import.meta.env.VITE_TOKEN_SERVER_URL;
    const response = await fetch(`${tokenServerURL}/is-onboarding-finished?interviewId=${interviewId}`,{});
    return await response.json();
}

async function fetchOnboardingUrl() {
    const tokenServerURL=import.meta.env.VITE_TOKEN_SERVER_URL;
    const response = await fetch(`${tokenServerURL}/onboarding-url`,{});
    
    return await response.json();
}

export export default {fetchOnboardingStatus, fetchOnboardingUrl};