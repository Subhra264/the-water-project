
/**
 * Makes a GET request to the given fetchURI, along with the accessToken(if exists)
 * 
 * @param {string} fetchURI The fetchURI to make the GET request to
 * @param {string} accessToken The Access Token
 * @param {Function} successHandler Callback function to call after success
 * @param {Function} errorHandler Callback function to call when an error occurs
 */
export function getRequest (fetchURI, accessToken, successHandler, errorHandler) {
    console.log('GET request access token', accessToken);
    const requestHeaders = accessToken? {
        'Authorization': `Bearer ${accessToken}`
    } : {};

    fetch(fetchURI, {
        method: 'GET',
        headers: requestHeaders
    })
    .then(res => res.json())
    .then(result => {
        console.log('GET request result', result);
        if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
        successHandler(result);
    })
    .catch(err => {
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
export function protectedRequest(fetchDetails, accessToken, successHandler, errorHandler) {
    console.log('Protected request', accessToken);
    const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    fetch(fetchDetails.fetchURI, {
        method: fetchDetails.method,
        headers: requestHeaders,
        body: JSON.stringify(fetchDetails.body)
    })
    .then(res => res.json())
    .then(result => {
        console.log('Result of protectedRequest', result);
        if (result.status_code && result.status_code !== 200) throw new Error(result.detail);
        successHandler(result);
    })
    .catch(err => {
        errorHandler(err.message);
    });
}