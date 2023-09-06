import { ProjectsEnum } from "enum/ProjectsEnum";
import { HttpResponse } from "model/HttpResponse";
import { GitHubCreateIssueBody } from "model/git/GitHubCreateIssueBody";
import BaseRestService from "./BaseRestService";

class GitService extends BaseRestService {
    async createIssue(repo: ProjectsEnum, title: string, bodyIssue = "", labels: string[] = []): Promise<HttpResponse<string>> {
        if (!repo) {
            return new HttpResponse()
        }

        let body: GitHubCreateIssueBody = {
            title: title,
            body: bodyIssue,
            labels: labels,
        }

        return this.postRequest<string>(this.urlwebapi + `/GitHub/CreateIssue?projectId=${repo}`, body)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    this.showMessage(response?.messagesToShow, 'error')
                    throw new Error(bodyIssue);
                }
                this.showMessage("The issue has been created. Thank you very much.", 'success');
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                    throw new Error(body);
                });
            });
    }
}
export default GitService;
