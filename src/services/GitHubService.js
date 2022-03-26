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

    async getReleases(repo, abortController) {
        if (!repo) {
            return null
        }
        return this.authService.fetch(this.url + `${repo}/releases`, null, { signal: abortController.signal })
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
