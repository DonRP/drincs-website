import AuthService from "./AuthService";

// https://support.crowdin.com/api/v2/
class CrowdinService {
    url = "https://api.crowdin.com/api/v2/";
    nameToken = "Crowdin";

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

    async getProject(projectId, abortController) {
        if (!projectId) {
            return null
        }
        return this.authService.fetch(this.url + `projects/${projectId}`, this.nameToken, { signal: abortController.signal })
            .then(response => {
                return response;
            })
            .catch((res) => {
                return res.response.json().then((body) => {
                    this.showError(body)
                });
            });
    }

    async getLanguages(projectId, abortController) {
        if (!projectId) {
            return null
        }
        return this.authService.fetch(this.url + `projects/${projectId}/languages/progress`, this.nameToken, { signal: abortController.signal })
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
export default CrowdinService;
