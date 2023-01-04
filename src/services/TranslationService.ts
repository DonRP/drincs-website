import { HttpResponse } from "model/HttpResponse";
import { TranslationResult } from "model/TranslationResult";
import RestService, { showError } from "./RestService";

// https://support.crowdin.com/api/v2/
class TranslationService {
    url = "https://drincs-website-back-end-production.up.railway.app";

    authService = new RestService();

    async getLanguages(repositoryName: string, crowdinProjectId: string, abortController: any): Promise<HttpResponse<TranslationResult>> {
        if (!repositoryName || !crowdinProjectId) {
            return new HttpResponse()
        }
        return this.authService.fetch(this.url + `/Translation/GetTranslations?repositoryName=${repositoryName}&crowdinProjectId=${crowdinProjectId}`, null, { signal: abortController.signal })
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
export default TranslationService;
