import { fetchWrapper } from "@/utils/fetch";
import type { User } from "@/types/user";

export const getCurrentUser = async (): Promise<User | null> => {
	return await fetchWrapper("/auth/me");
};

export const updateUserName = async (
	firstName: string,
	lastName: string
): Promise<void> => {
	return await fetchWrapper("/user/update/userName", {
		method: "PUT",
		body: JSON.stringify({ firstName, lastName })
	});
};

export const updateUserEmail = async (
	email: string,
	password: string
): Promise<void> => {
	return await fetchWrapper("/user/update/email", {
		method: "PUT",
		body: JSON.stringify({ email, password })
	});
};

export const updateUserPassword = async (
	password: string,
	newPassword: string
): Promise<void> => {
	return await fetchWrapper("/user/update/password", {
		method: "PUT",
		body: JSON.stringify({ password, newPassword })
	});
};

export const deleteUser = async (email: string): Promise<void> => {
	return await fetchWrapper("/user/remove", {
		method: "DELETE",
		body: JSON.stringify({ email })
	});
};
