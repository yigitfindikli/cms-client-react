"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode
} from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {
	getCurrentUser,
	logout as _logout,
	login as _login,
	register as _register
} from "@/services/AuthService";
import { LoginData, RegisterData } from "@/types/auth";

interface AuthContextProps {
	user: User | null;
	loading: boolean;
	login: (user: LoginData) => void;
	register: (user: RegisterData) => void;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			const currentUser = await getCurrentUser();
			setUser(currentUser);
			setLoading(false);
		};

		fetchUser();
	}, []);

	const login = async (user: LoginData) => {
		const res = await _login(user);

		if (res.status === "success") {
			setUser(res.user);
			router.push("/");
		}
	};

	const logout = async () => {
		await _logout();

		setUser(null);
		router.push("/");
	};

	const register = async (user: RegisterData) => {
		const res = await _register(user);

		if (res.status === "success") {
			router.push("/login");
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout, register }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
