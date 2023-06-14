import { HttpResponse } from "model/HttpResponse";
import BaseRestService from "./BaseRestService";

class GitService extends BaseRestService {
    async createIssue(repo: string, title: string, body = "", labels = []): Promise<HttpResponse<any>> {
        if (!repo) {
            return new HttpResponse()
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');

        const requestOptions = {
            headers,
            body: JSON.stringify({
                title,
                body,
                labels
            })
        };

        return this.postRequest(this.urlwebapi + `/GitHub/CreateIssue?repositoryName=${repo}`, requestOptions)
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
export default GitService;
