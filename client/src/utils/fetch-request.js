export const SERVER_HOST =
  process.env.REACT_APP_SERVER_HOST || 'http://localhost:8000';

// Refreshes both the access token and the refresh token
// and uses the newly generated access token to retry fetching
// the original endpoint
function refreshTokens(retryFetchingWithAccess) {
  // Get the refresh token from localStorage
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) throw new Error('login_needed');

  const fetchDetails = {
    fetchURI: '/refresh-token/',
    method: 'POST',
    body: {
      refresh: refreshToken,
    },
  };

  const successHandler = (result) => {
    localStorage.setItem('access_token', result.access);
    localStorage.setItem('refresh_token', result.refresh);

    // Retry fetching the original endpoint with new access token
    retryFetchingWithAccess(result.access);
  };

  const errorHandler = (errMessage) => {
    // Do something
    throw new Error(errMessage);
  };

  protectedRequest(fetchDetails, null, successHandler, errorHandler);
}

/**
 * Makes a GET request to the given fetchURI, along with the accessToken(if exists)
 *
 * @param {string} fetchURI The fetchURI to make the GET request to
 * @param {string} accessToken The Access Token
 * @param {Function} successHandler Callback function to call after success
 * @param {Function} errorHandler Callback function to call when an error occurs
 */
export function getRequest(
  fetchURI,
  accessToken,
  successHandler,
  errorHandler,
) {
  console.log('GET request access token', accessToken);
  const requestHeaders = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  fetch(SERVER_HOST + fetchURI, {
    method: 'GET',
    headers: requestHeaders,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log('GET request result', result);
      if (result.status_code && result.status_code !== 200) {
        if (result.code && result.code === 'token_not_valid') {
          // Refresh the tokens using the refresh token
          refreshTokens((newAccessToken) =>
            getRequest(fetchURI, newAccessToken, successHandler, errorHandler),
          );
        } else if (result.status_code && result.status_code === 404) {
          throw new Error('page_not_found');
        } else {
          throw new Error(result.detail);
        }
      } else {
        successHandler(result);
      }
    })
    .catch((err) => {
      errorHandler(err.message);
    });
}

/**
 * Makes Request to Protected endpoints.
 *
 * @param {object} fetchDetails Contains the fetchURI, request method and the request body
 * @param {string} accessToken The Access Token
 * @param {Function} successHandler Callback function to call after success
 * @param {Function} errorHandler Callback function to call when an error occurs
 */
export function protectedRequest(
  fetchDetails,
  accessToken,
  successHandler,
  errorHandler,
) {
  let requestHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  let fetchDetailsBody = fetchDetails.body;

  // Check if the fetchDetails.body is FormData
  if (!fetchDetails.isFormData) {
    requestHeaders['Content-Type'] = 'application/json';
    fetchDetailsBody = JSON.stringify(fetchDetails.body);
  }

  fetch(SERVER_HOST + fetchDetails.fetchURI, {
    method: fetchDetails.method,
    headers: requestHeaders,
    body: fetchDetailsBody,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log('Result of protectedRequest', result);
      if (result.status_code && result.status_code !== 200) {
        if (result.code && result.code === 'token_not_valid') {
          // Refresh the tokens and then try again
          refreshTokens((newAccessToken) =>
            protectedRequest(
              fetchDetails,
              newAccessToken,
              successHandler,
              errorHandler,
            ),
          );
        } else {
          throw new Error(result.detail);
        }
      } else {
        successHandler(result);
      }
    })
    .catch((err) => {
      errorHandler(err.message);
    });
}
