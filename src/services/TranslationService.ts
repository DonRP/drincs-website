import { ProjectsEnum } from "enum/ProjectsEnum";
import { HttpResponse } from "model/HttpResponse";
import { MyError } from "model/MyError";
import { TranslationResult } from "model/Translation/TranslationResult";
import BaseRestService from "./BaseRestService";

// https://support.crowdin.com/api/v2/
class TranslationService extends BaseRestService {
    async getLanguages(projectId: ProjectsEnum): Promise<HttpResponse<TranslationResult>> {
        return this.getRequest<TranslationResult>(this.urlwebapi + `/Translation/GetTranslations?projectId=${projectId}`)
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

export default TranslationService;
