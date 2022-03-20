
// need a clientID and redirectURI

const clientID = '583c94ecbb034584a24901479f3c6194';
const redirectURI = encodeURIComponent("http://localhost:3000/") //or surge deployment url?
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientID}&redirect_uri=${redirectURI}`;

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
    
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
          const expiresIn = Number(expiresInMatch[1]);
          this.storeAccessToken(accessTokenMatch[1], expiresIn);
          window.history.pushState("Access Token", null, "/");
          return this.getStoredAccessToken();
        } else {
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = accessUrl;
          return false;
        }
      },

    search(searchTerm){
        const accessToken = this.getStoredAccessToken();
        if (accessToken) {
            let urlRequest = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
            let searchRequest = fetch(urlRequest, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }).then(function (response){
                return response.json()      
            }).then((JSON) => {return JSON});
            return searchRequest;
        }
    }

};
















export default Spotify;