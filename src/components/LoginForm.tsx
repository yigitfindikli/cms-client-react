"use client";

import { useForm } from "react-hook-form";
import { LoginData } from "@/types/auth";
import { useAuth } from "@/providers/AuthProvider";
import Button from "./Button";

interface LoginFormValues {
	email: string;
	password: string;
}

const LoginForm = () => {
	const { register, handleSubmit } = useForm<LoginFormValues>();

	const { login } = useAuth();

	const onLogin = async (data: LoginData) => {
		if (!data.email || !data.password) {
			return;
		}

		await login(data);
	};

	const onSubmit = async (data: LoginFormValues) => {
		await onLogin(data);
	};

	return (
		<div className="flex items-center justify-center h-full bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-bold text-center text-gray-900">
					Login
				</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							{...register("email")}
							required
							className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							{...register("password")}
							required
							className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
						/>
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
