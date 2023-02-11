import { HttpResponse } from "model/HttpResponse";
import BaseRestService from "./BaseRestService";

class GitService extends BaseRestService {
    async createIssue(repo: string, title: string, body = "", labels = [], abortController: any): Promise<HttpResponse<any>> {
        if (!repo) {
            return new HttpResponse()
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');

        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title,
                body,
                labels
            })
        };

        return this.customFetch(this.urlwebapi + `/GitHub/CreateIssue?repositoryName=${repo}`, requestOptions)
            .then(response => {
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                });
            });
    }
}
export default GitService;
