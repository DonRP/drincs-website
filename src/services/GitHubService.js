import AuthService from "./AuthService";

// https://support.GitHub.com/api/v2/
class GitHubService {
    url = "https://api.github.com/repos/";

    authService = new AuthService();
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

    async createIssue(repo, title, body = "", labels = [], abortController) {
        if (!repo) {
            return null
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

        const request = new Request(this.url + `${repo}/issues`, requestOptions);

        return this.authService.fetch(request, process.env.REACT_APP_API_KEY_GITHUB, { signal: abortController.signal }, "token")
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
export default GitHubService;
