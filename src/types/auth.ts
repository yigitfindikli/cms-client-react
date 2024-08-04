import { User } from "./user";

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	accessToken: string;
	refreshToken: string;
}

export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface LoginResponse {
	status: string;
	user: User;
}

export interface RegisterResponse {
	status: string;
	user?: User;
}

export interface RefreshTokenResponse {
	access_token: string;
}
