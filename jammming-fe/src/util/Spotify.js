
// need a clientID and redirectURI


let token = {};
class Spotify {

    getAccessToken(){
        if(token) {
            return token;
        } else {
            //check to see if tokens match
            const tokenMatch = window.location.href.match(/access_token=([^&]*)/)
            const expiredMatch = window.location.href.match(/expires_in=([^&]*)/)
        }

    }





};
















export default Spotify;