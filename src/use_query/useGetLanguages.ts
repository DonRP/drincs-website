import { ProjectsEnum } from "../enum/ProjectsEnum";
import { TranslationResult } from "../model/Translation/TranslationResult";
import TranslationService from "../services/TranslationService";
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
		...rest
	} = props;
	return useMyQuery({
		...rest,
		staleTime: 300000,
		queryKey: [GET_LANGUAGES_CACHE_KEY, projectId.toString()],
		queryFn: async () => {
			let service = new TranslationService()
			return service.getLanguages(projectId).then(res => {
				thenFn && thenFn(res)
				return res
			}).catch(err => {
				catchFn && catchFn(err)
				throw err
			})
		},
	});
}
