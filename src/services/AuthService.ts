import { fetchWrapper } from "../utils/fetch";
import { GetServerSidePropsContext } from "next";
import type {
	LoginData,
	RegisterData,
	LoginResponse,
	RegisterResponse,
	RefreshTokenResponse
} from "@/types/auth";
import { User } from "@/types/user";

export const login = async (data: LoginData): Promise<LoginResponse> => {
	return await fetchWrapper("/auth/login", {
		method: "POST",
		body: JSON.stringify(data)
	});
};

export const register = async (
	data: RegisterData
): Promise<RegisterResponse> => {
	return await fetchWrapper("/auth/register", {
		method: "POST",
		body: JSON.stringify(data)
	});
};

export const getCurrentUser = async (
	headers?: HeadersInit
): Promise<User | null> => {
	try {
		const options: RequestInit = {
			headers: {
				...headers,
				"Content-Type": "application/json"
			},
			credentials: "include"
		};

		const { user } = await fetchWrapper("/auth/me", options);

		return user || null;
	} catch {
		return null;
	}
};

export const refreshAccessToken = async (
	refreshToken: string
): Promise<RefreshTokenResponse> => {
	return await fetchWrapper("/auth/refresh", {
		method: "POST",
		body: JSON.stringify({ refresh_token: refreshToken })
	});
};

export const logout = async () => {
	return await fetchWrapper("/auth/logout", {
		method: "POST"
	});
};
