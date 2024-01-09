import { ProjectsEnum } from "enum/ProjectsEnum";
import { HttpResponse } from "model/HttpResponse";
import { MyError } from "model/MyError";
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
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                return response;
            })
            .catch((res) => {
                throw res
            });
    }
}
export default GitService;
