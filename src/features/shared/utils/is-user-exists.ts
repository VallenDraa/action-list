import { UserModel } from '../../auth/models/user-model';

export const isUserWithUsernameExists = async (username: string) => {
	const isExists = await UserModel.exists({ username });

	return isExists !== null;
};

export const isUserWithIdExists = async (_id: string) => {
	const isExists = await UserModel.exists({ _id });

	return isExists !== null;
};
