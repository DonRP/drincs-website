import { UserProfile } from "model/Auth/UserProfile";
import AuthService, { getAccessToken, isLoggedIn } from "../services/AuthService";
import { UseMyQueryProps, useMyQuery } from "./useMyQuery";

export const GET_PROFILE_CACHE_KEY = "AuthService.getProfile";

interface IProps<T> extends UseMyQueryProps<T> { }

export function useGetProfileCache(props: IProps<UserProfile>) {
	const {
		then: thenFn,
		catch: catchFn,
		...rest
	} = props;
	return useMyQuery({
		...rest,
		queryKey: [GET_PROFILE_CACHE_KEY, getAccessToken() || ""],
		queryFn: async () => {
			if (!isLoggedIn()) {
				return new UserProfile()
			}
			let authService = new AuthService()
			return authService.getProfile().then((res) => {
				thenFn && thenFn(res)
				return res
			}).catch((err) => {
				catchFn && catchFn(err)
				throw err
			})
		},
	});
}
