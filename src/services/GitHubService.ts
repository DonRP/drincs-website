import { HttpResponse } from "model/HttpResponse";
import AuthService, { showError } from "./AuthService";

class GitService {
    url = "https://drincs-website-back-end-production.up.railway.app";

    authService = new AuthService();

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

        const request = new Request(this.url + `/GitHub/CreateIssue?repositoryName=${repo}`, requestOptions);

        return this.authService.fetch(request, null, { signal: abortController.signal })
            .then(response => {
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    showError(body)
                });
            });
    }
}
export default GitService;
