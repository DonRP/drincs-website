import { HttpResponse } from "model/HttpResponse";
import BaseRestService from "./BaseRestService";

class GitService extends BaseRestService {
    async createIssue(repo: string, title: string, body = "", labels: string[] = []): Promise<HttpResponse<any>> {
        if (!repo) {
            return new HttpResponse()
        }

        return this.postRequest(this.urlwebapi + `/GitHub/CreateIssue?repositoryName=${repo}`, {
            title,
            body,
            labels
        })
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
