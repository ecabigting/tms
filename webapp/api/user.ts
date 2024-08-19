import { currentUser } from "../utils/sessions";
import { requestGetBuilder } from "../utils/utils";

export const getAllUsers = async (): Promise<any> => {
	const loggedInUser = await currentUser();
	const res = await requestGetBuilder("users", loggedInUser.access.accessToken);
	return res;
};
