import * as oauth from 'oauth4webapi';
console.log('loading oauth4webapi')
// Authorization server's Issuer Identifier URL
const issuer: URL = new URL(import.meta.env.VITE_ISSUER_URL);
// Scope from the authorization section
const scope: string = 'openid profile email';
// For incode oidc
const algorithm:
| 'oauth2' /* For .well-known/oauth-authorization-server discovery */
| 'oidc' /* For .well-known/openid-configuration discovery */
| undefined /* Defaults to 'oidc' */
= 'oidc';
// Client id from the authorization section
const client_id: string = import.meta.env.VITE_CLIENT_ID;
// Value used in the authorization request as redirect_uri pre-registered at the Authorization Server.
const redirect_uri: string = import.meta.env.VITE_REDIRECT_URI;
// For incode s256
const code_challenge_method: string = 'S256';

console.log('setting up basic values')

const client: oauth.Client = {
  client_id,
  token_endpoint_auth_method: 'none',
}
console.log('created client')

// Retrieves the authentication URL to which to redirect the user
const fetchAuthenticationUrl = async function (login_hint) {
  /**
  * The following MUST be generated for every redirect to the authorization_endpoint. You must store
  * the code_verifier and nonce in the end-user session such that it can be recovered as the user
  * gets redirected from the authorization server back to your application.
  */
  const code_verifier = oauth.generateRandomCodeVerifier()
  console.log('created code verifier')
  const as = await oauth
  .discoveryRequest(issuer, { algorithm })
  .then((response) => oauth.processDiscoveryResponse(issuer, response))
  console.log('discovering setup using .well-known')
  
  console.log('fetching authentication url')
  const code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier)
  
  let state: string | undefined
  
  // redirect user to as.authorization_endpoint
  const authorizationUrl = new URL(as.authorization_endpoint!)
  authorizationUrl.searchParams.set('client_id', client.client_id)
  authorizationUrl.searchParams.set('redirect_uri', redirect_uri)
  authorizationUrl.searchParams.set('response_type', 'code')
  authorizationUrl.searchParams.set('scope', scope)
  authorizationUrl.searchParams.set('code_challenge', code_challenge)
  authorizationUrl.searchParams.set('code_challenge_method', code_challenge_method)
  //TODO: Login hint is being ignored by the oidc, and when uniqueId is configured
  // as login hint in the dashboard is breaks
  authorizationUrl.searchParams.set('login_hint', login_hint)

  /**
  * We cannot be sure the AS supports PKCE so we're going to use state too. Use of PKCE is
  * backwards compatible even if the AS doesn't support it which is why we're using it regardless.
  */
  if (as.code_challenge_methods_supported?.includes('S256') !== true) {
    state = oauth.generateRandomState()
    authorizationUrl.searchParams.set('state', state)
  }
  
  console.log('fetchAuthenticationUrl');
  return { url: authorizationUrl.href, code_verifier, state }
}

// Validates the authentication and retrieves the oidcSession that can be used to retrieve further data
const validateFaceAuthentication = async function (code_verifier, state) {
  console.log('processDiscoveryResponse')
  const as = await oauth
  .discoveryRequest(issuer, { algorithm })
  .then((response) => oauth.processDiscoveryResponse(issuer, response))
  
  
  console.log('validateAuthResponse')
  const currentUrl: URL = new URL(window.location.href);
  const params = await oauth.validateAuthResponse(as, client, currentUrl, state)
  if (oauth.isOAuth2Error(params)) {
    const oauthError: oauth.OAuth2Error = params;
    throw new Error(oauthError.error_description) // Handle OAuth 2.0 redirect error
  }
  
  console.log('authorizationCodeGrantRequest')
  const response = await oauth.authorizationCodeGrantRequest(as,client,params as URLSearchParams,redirect_uri,code_verifier)
  
  
  let challenges: oauth.WWWAuthenticateChallenge[] | undefined
  console.log('parseWwwAuthenticateChallenges')
  if ((challenges = oauth.parseWwwAuthenticateChallenges(response))) {
    for (const challenge of challenges) {
      console.error('WWW-Authenticate Challenge', challenge)
    }
    throw new Error() // Handle WWW-Authenticate Challenges as needed
  }
  
  console.log('processAuthorizationCodeOAuth2Response')
  const oidcSession = await oauth.processAuthorizationCodeOpenIDResponse(as, client, response)
  if (oauth.isOAuth2Error(oidcSession)) {
    const oauthError: oauth.OAuth2Error = oidcSession;
    throw new Error(oauthError.error) // Handle OAuth 2.0 redirect error
  }
  
  //{
  //  "access_token": "eyJraWQiOiI2MzM2NjAyYy05ZDV...3m6Ga02gkxVPv_A",
  //  "scope": "openid profile email",
  //  "id_token": "eyJraWQiOiI2MzM2NjAyYy05ZDViLTRlMDgtYmQ1Zi1kZDcwODJmNjdmY...8qDX7uA8eU3HsvZcg",
  //  "token_type": "bearer",
  //  "expires_in": 299
  //}
  return oidcSession;
}

// Fetch the information from all the scopes available.
const fetchUserInfo = async function (oidcSession){
  const as = await oauth
  .discoveryRequest(issuer, { algorithm })
  .then((response) => oauth.processDiscoveryResponse(issuer, response))
  const userInfo = await oauth.userInfoRequest(as, client, oidcSession.access_token, {})
  return userInfo.json()
}

export { fetchAuthenticationUrl,validateFaceAuthentication, fetchUserInfo };