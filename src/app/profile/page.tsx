"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useForm } from "react-hook-form";
import {
	updateUserName,
	updateUserEmail,
	updateUserPassword,
	deleteUser
} from "@/services/UserService";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
	const { user, logout } = useAuth();
	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingEmail, setIsEditingEmail] = useState(false);
	const [isEditingPassword, setIsEditingPassword] = useState(false);

	const { register, handleSubmit, setValue } = useForm<
		User & { password: string; newPassword: string }
	>();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			setValue("firstName", user.firstName);
			setValue("lastName", user.lastName);
			setValue("email", user.email);
		}
	}, [user, setValue]);

	const handleNameUpdate = async (data: User) => {
		await updateUserName(data.firstName, data.lastName);
		setIsEditingName(false);
		router.refresh();
	};

	const handleEmailUpdate = async (data: {
		email: string;
		password: string;
	}) => {
		await updateUserEmail(data.email, data.password);
		setIsEditingEmail(false);
		router.refresh();
	};

	const handlePasswordUpdate = async (data: {
		password: string;
		newPassword: string;
	}) => {
		await updateUserPassword(data.password, data.newPassword);
		setIsEditingPassword(false);
		router.refresh();
	};

	const handleDelete = async () => {
		if (user) {
			await deleteUser(user.email);
			logout();
			router.push("/login");
		}
	};

	if (!user) return <p>Loading...</p>;

	return (
		<div className="container mx-auto p-4 flex flex-col gap-6">
			<h1 className="text-3xl font-bold mb-6">Profile</h1>
			<div className="space-y-6">
				<div className="bg-white p-4 rounded shadow flex flex-col gap-4">
					<div className="flex flex-wrap justify-between items-center">
						<h2 className="text-2xl font-semibold">Name</h2>
						{!isEditingName && (
							<button
								onClick={() => setIsEditingName(true)}
								className="bg-blue-500 text-white px-4 py-2 rounded"
							>
								Edit
							</button>
						)}
					</div>
					{isEditingName ? (
						<form
							onSubmit={handleSubmit(handleNameUpdate)}
							className="flex flex-col gap-4"
						>
							<div>
								<label
									htmlFor="firstName"
									className="block font-medium"
								>
									First Name
								</label>
								<input
									id="firstName"
									{...register("firstName")}
									type="text"
									required
									className="w-full p-2 border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="lastName"
									className="block font-medium"
								>
									Last Name
								</label>
								<input
									id="lastName"
									{...register("lastName")}
									type="text"
									required
									className="w-full p-2 border rounded"
								/>
							</div>
							<div className="flex gap-4">
								<button
									type="submit"
									className="bg-blue-500 text-white px-4 py-2 rounded"
								>
									Save
								</button>
								<button
									type="button"
									onClick={() => setIsEditingName(false)}
									className="bg-gray-500 text-white px-4 py-2 rounded"
								>
									Cancel
								</button>
							</div>
						</form>
					) : (
						<p>
							{user.firstName} {user.lastName}
						</p>
					)}
				</div>

				<div className="bg-white p-4 rounded shadow flex flex-col gap-4">
					<div className="flex flex-wrap justify-between items-center">
						<h2 className="text-2xl font-semibold">Email</h2>
						{!isEditingEmail && (
							<button
								onClick={() => setIsEditingEmail(true)}
								className="bg-blue-500 text-white px-4 py-2 rounded"
							>
								Edit
							</button>
						)}
					</div>
					{isEditingEmail ? (
						<form
							onSubmit={handleSubmit(handleEmailUpdate)}
							className="flex flex-col gap-4"
						>
							<div>
								<label
									htmlFor="email"
									className="block font-medium"
								>
									New Email
								</label>
								<input
									id="email"
									{...register("email")}
									type="email"
									required
									className="w-full p-2 border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block font-medium"
								>
									Current Password
								</label>
								<input
									id="password"
									{...register("password")}
									type="password"
									required
									className="w-full p-2 border rounded"
								/>
							</div>
							<div className="flex gap-4">
								<button
									type="submit"
									className="bg-blue-500 text-white px-4 py-2 rounded"
								>
									Save
								</button>
								<button
									type="button"
									onClick={() => setIsEditingEmail(false)}
									className="bg-gray-500 text-white px-4 py-2 rounded"
								>
									Cancel
								</button>
							</div>
						</form>
					) : (
						<p>{user.email}</p>
					)}
				</div>

				<div className="bg-white p-4 rounded shadow flex flex-col gap-4">
					<div className="flex flex-wrap justify-between items-center">
						<h2 className="text-2xl font-semibold">Password</h2>
						{!isEditingPassword && (
							<button
								onClick={() => setIsEditingPassword(true)}
								className="bg-blue-500 text-white px-4 py-2 rounded"
							>
								Change Password
							</button>
						)}
					</div>
					{isEditingPassword ? (
						<form
							onSubmit={handleSubmit(handlePasswordUpdate)}
							className="flex flex-col gap-4"
						>
							<div>
								<label
									htmlFor="password"
									className="block font-medium"
								>
									Current Password
								</label>
								<input
									id="password"
									{...register("password")}
									type="password"
									required
									className="w-full p-2 border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="newPassword"
									className="block font-medium"
								>
									New Password
								</label>
								<input
									id="newPassword"
									{...register("newPassword")}
									type="password"
									required
									className="w-full p-2 border rounded"
								/>
							</div>
							<div className="flex gap-4">
								<button
									type="submit"
									className="bg-blue-500 text-white px-4 py-2 rounded"
								>
									Save
								</button>
								<button
									type="button"
									onClick={() => setIsEditingPassword(false)}
									className="bg-gray-500 text-white px-4 py-2 rounded"
								>
									Cancel
								</button>
							</div>
						</form>
					) : null}
				</div>

				<div className="bg-white p-4 rounded shadow flex flex-col gap-4">
					<div className="flex flex-wrap justify-between items-center">
						<h2 className="text-2xl font-semibold">
							Delete Account
						</h2>
						<button
							onClick={handleDelete}
							className="bg-red-500 text-white px-4 py-2 rounded max-w-xs"
						>
							Delete Account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
