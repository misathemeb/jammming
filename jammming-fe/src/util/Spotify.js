
// need a clientID and redirectURI
const clientID = '583c94ecbb034584a24901479f3c6194';
const redirectURI = "http://localhost:3000/" //or surge deployment url?
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientID}&redirect_uri=${redirectURI}`;

let token = {};
class Spotify {

    getAccessToken(){
        if(token) {
            return token;
        } 
        //check to see if tokens match
        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiredToken = window.location.href.match(/expires_in=([^&]*)/);
        if (accessToken === expiredToken){
            window.history.pushState('Access Token has expired', null); 
            
        } else {
            window.location = spotifyUrl;
        }
    }

};
















export default Spotify;