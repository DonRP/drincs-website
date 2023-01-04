import RestService from "./RestService";

// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/1fd23117345cd1dc3e75c7d69efae994e929c279/Tweet-Lookup/get_tweets_with_bearer_token.js
class TweetService {
    url = "https://api.twitter.com/2/";

    authService = new RestService();
    showError(body) {
        console.log(body)
        if (body.error) {
            window.alert(body.error)
        } else if (body.message) {
            window.alert(body.message)
        } else {
            window.alert("basdfas")
        }
        throw Object.assign(
            new Error(body)
        );
    }

    async getUserInfo(userId, abortController) {
        if (!userId) {
            return null
        }
        return this.authService.fetch(this.url + `users/${userId}`, process.env.REACT_APP_API_KEY_TWITTER, { signal: abortController.signal })
            .then(response => {
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body) => {
                    this.showError(body)
                });
            });
    }

    async getTweets(nocodeapilink, abortController) {
        return this.authService.fetch(nocodeapilink, null, { signal: abortController.signal })
            .then(response => {
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body) => {
                    this.showError(body)
                });
            });
    }
}
export default TweetService;
