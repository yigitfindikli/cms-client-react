"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useForm } from "react-hook-form";
import Button from "./Button";

interface RegisterFormValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const RegisterForm = () => {
	const { register: registerForm, handleSubmit } =
		useForm<RegisterFormValues>();
	const { register } = useAuth();

	const onSubmit = (data: RegisterFormValues) => {
		register(data);
	};

	return (
		<div className="flex items-center justify-center h-full bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
				<h1 className="text-2xl font-bold text-center">Register</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<label
							htmlFor="firstName"
							className="block text-sm font-medium text-gray-700"
						>
							First Name
						</label>
						<input
							id="firstName"
							{...registerForm("firstName")}
							type="text"
							required
							className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<div>
						<label
							htmlFor="lastName"
							className="block text-sm font-medium text-gray-700"
						>
							Last Name
						</label>
						<input
							id="lastName"
							{...registerForm("lastName")}
							type="text"
							required
							className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							{...registerForm("email")}
							type="email"
							required
							className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
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
							id="password"
							{...registerForm("password")}
							type="password"
							required
							className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
						/>
					</div>
					<Button type="submit">Register</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
