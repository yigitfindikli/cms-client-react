"use client";

import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useMemo } from "react";

const Navbar = () => {
	const { user, logout, loading } = useAuth();

	const authLinks = useMemo(() => {
		if (loading) return null;

		return user ? (
			<>
				<Link href="/profile" className="hover:underline">
					Profile
				</Link>
				<button onClick={async () => await logout()}>Logout</button>
			</>
		) : (
			<>
				<Link href="/login" className="hover:underline">
					Login
				</Link>
				<Link href="/register" className="hover:underline">
					Register
				</Link>
			</>
		);
	}, [user, logout, loading]);

	return (
		<nav className="bg-gray-800 p-4 text-white">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-lg font-bold">CMS Client</div>
				<div className="space-x-4">
					<Link href="/" className="hover:underline">
						Home
					</Link>
					<Link href="/posts" className="hover:underline">
						Posts
					</Link>

					{authLinks}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
