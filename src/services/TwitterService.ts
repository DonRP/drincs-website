import BaseRestService from "./BaseRestService";

// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/1fd23117345cd1dc3e75c7d69efae994e929c279/Tweet-Lookup/get_tweets_with_bearer_token.js
class TweetService extends BaseRestService {
    url = "https://api.twitter.com/2/";

    async getUserInfo(userId: string) {
        if (!userId) {
            return null
        }
        return this.customFetch(this.url + `users/${userId}`, process.env.REACT_APP_API_KEY_TWITTER)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    this.showMessage(response?.messagesToShow, 'error')
                }
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                });
            });
    }

    async getTweets(nocodeapilink: string) {
        return this.customFetch(nocodeapilink, null)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    this.showMessage(response?.messagesToShow, 'error')
                }
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                });
            });
    }
}
export default TweetService;
