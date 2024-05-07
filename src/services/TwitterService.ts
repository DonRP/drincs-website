import { MyError } from "../model/MyError";
import BaseRestService from "./BaseRestService";

// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/1fd23117345cd1dc3e75c7d69efae994e929c279/Tweet-Lookup/get_tweets_with_bearer_token.js
class TweetService extends BaseRestService {
    url = "https://api.twitter.com/2/";

    async getUserInfo(userId: string) {
        if (!userId) {
            return null
        }
        return this.getRequest(this.url + `users/${userId}`, process.env.REACT_APP_API_KEY_TWITTER)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                return response;
            })
            .catch((res) => {
                throw res
            });
    }

    async getTweets(nocodeapilink: string) {
        return this.getRequest(nocodeapilink)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                return response;
            })
            .catch((res) => {
                throw res
            });
    }
}
export default TweetService;
