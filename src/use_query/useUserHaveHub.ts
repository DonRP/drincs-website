import { ProjectsEnum } from "enum/ProjectsEnum";
import { TranslationResult } from "model/Translation/TranslationResult";
import TranslationService from "services/TranslationService";
import { UseMyQueryProps, useMyQuery } from "./useMyQuery";

export const GET_LANGUAGES_CACHE_KEY = "TranslationService.getLanguages";

interface IProps<T> extends UseMyQueryProps<T> {
	projectId: ProjectsEnum
}

export function useGetLanguages(props: IProps<TranslationResult>) {
	const {
		then: thenFn,
		catch: catchFn,
		projectId,
		staleTime = 60000, // 1 minute
		...rest
	} = props;
	return useMyQuery({
		...rest,
		staleTime: staleTime,
		queryKey: [GET_LANGUAGES_CACHE_KEY, projectId.toString()],
		queryFn: async () => {
			let service = new TranslationService()
			return service.getLanguages(projectId).then(res => {
				if (!res || !res.isSuccessStatusCode || !res.content) {
					catchFn && catchFn(res)
					throw res
				}
				thenFn && thenFn(res?.content)
				return res?.content
			}).catch(err => {
				catchFn && catchFn(err)
				throw err
			})
		},
	});
}
