import { ProjectsEnum } from "enum/ProjectsEnum";
import { HttpResponse } from "model/HttpResponse";
import { TranslationResult } from "model/Translation/TranslationResult";
import BaseRestService from "./BaseRestService";

// https://support.crowdin.com/api/v2/
class TranslationService extends BaseRestService {
    async getLanguages(projectId: ProjectsEnum): Promise<HttpResponse<TranslationResult>> {
        return this.getRequest(this.urlwebapi + `/Translation/GetTranslations?projectId=${projectId}`)
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
