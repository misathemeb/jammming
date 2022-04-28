
// need a clientID and redirectURI

const clientID = '583c94ecbb034584a24901479f3c6194';
const redirectURI = encodeURIComponent("http://localhost:3000/") //or surge deployment url?
// const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientID}&redirect_uri=${redirectURI}`;

const localStorageKey = "accessToken";

let Spotify = {
    storeAccessToken(accessToken, ttl) {
        const now = new Date();
    
        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        const item = {
          value: accessToken,
          expiry: now.getTime() + ttl * 1000,
        };
        localStorage.setItem(localStorageKey, JSON.stringify(item));
      },

      getStoredAccessToken() {
        const itemStr = localStorage.getItem(localStorageKey);
    
        // if the item doesn't exist, return false
        if (!itemStr) {
          return false;
        }
    
        const item = JSON.parse(itemStr);
        const now = new Date();
    
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
          // If the item is expired, delete the item from storage
          // and return false
          localStorage.removeItem(localStorageKey);
          return false;
        }
        return item.value;
      },

      getAccessToken() {
        if (this.getStoredAccessToken()) {
          return this.getStoredAccessToken();
        }
    
        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
          let expiresIn = Number(expiresInMatch[1]);
          this.storeAccessToken(accessTokenMatch[1], expiresIn);
          window.history.pushState("Access Token", null, "/");
          return this.getStoredAccessToken();
        } else {
          let accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = accessUrl;
          return false;
        }
      },
      //fetch request to return a promise
      async search(term) {
        let accessToken = Spotify.getAccessToken();
        if (accessToken) {
          const response = await fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const jsonResponse = await response.json();
          if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
        return false;
      },
      //custom playlist method (3 requests to API: get, userId, POST new playlist, POST track URIs to new playlist matching user)
      async savePlaylist(playlistName, trackURI){
        if (!playlistName || !trackURI.length){
          return;
        }
        let accessToken = Spotify.getAccessToken;
        let headers = { Authorization: `Bearer ${accessToken}`};
        let response, jsonResponse;

       //get the userId
        let userId;
        response = await fetch(`https://api.spotify.com/v1/me`, {
          headers: headers,
        });
        jsonResponse = await response.json();
        userId = jsonResponse.id;
        
        //make a playlist and get the playlistName
        response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        }
      );
        jsonResponse = await response.json();
        const playlistId = jsonResponse.id;

           //Save tracks to the newly created playlist
      response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ uris: trackURI }),
        }
      );
      return await response.json();
    }
  

    };

  
export default Spotify;