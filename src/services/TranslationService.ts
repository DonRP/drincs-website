import { ProjectsEnum } from "../enum/ProjectsEnum";
import { MyError } from "../model/MyError";
import { TranslationResult } from "../model/Translation/TranslationResult";
import BaseRestService from "./BaseRestService";

// https://support.crowdin.com/api/v2/
class TranslationService extends BaseRestService {
    async getLanguages(projectId: ProjectsEnum): Promise<TranslationResult> {
        return this.getRequest<TranslationResult>(this.urlwebapi + `/Translation/GetTranslations?projectId=${projectId}`)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                return response.content
            })
            .catch((res) => {
                throw res
            });
    }
}

export default TranslationService;
