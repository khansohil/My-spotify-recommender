const axios = require("axios")
const qs = require("qs")

// // Spotify auth scopes permitted for this application
// const AUTH_SCOPE = "user-read-private user-read-email";

const SPOTIFY_ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token"

// This function uses Client Credentials to obtain an access token from Spotify
// See Spotify auth documentation: https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
const getAccessToken = async () => {
  // For the Authorization header, Spotify requires a base64 encoded token made of the Client ID and Client Secret joined with ":"
  const encodedToken = Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
  
  // Spotify auth API requires data to be sent as Content-Type x-www-form-urlencoded, so data must be converted to query string format 
  const data = qs.stringify({
    grant_type: "client_credentials"
  })
  
  const authOptions = { 
    method: "post",
    url: SPOTIFY_ACCESS_TOKEN_URL,
    headers: {
      'Authorization': `Basic ${encodedToken}`,
      'Content-Type': "application/x-www-form-urlencoded"
    },
    data
  };

  // Make a post request with axios to Spotify to get access token with client credentials
  const accessToken = await axios(authOptions)
  return encodedToken
}

// export the getAccessToken function so we can use it in server.js
module.exports = { getAccessToken }

