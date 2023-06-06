import { HttpResponse } from "model/HttpResponse";
import { TranslationResult } from "model/Translation/TranslationResult";
import BaseRestService from "./BaseRestService";

// https://support.crowdin.com/api/v2/
class TranslationService extends BaseRestService {
    async getLanguages(repositoryName: string, crowdinProjectId: string): Promise<HttpResponse<TranslationResult>> {
        if (!repositoryName || !crowdinProjectId) {
            return new HttpResponse()
        }
        return this.customFetch(this.urlwebapijs + `/Translation/GetTranslations?repositoryName=${repositoryName}&crowdinProjectId=${crowdinProjectId}`)
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
export default TranslationService;
