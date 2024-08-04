import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<div className="flex flex-col flex-grow">
						<Navbar />
						<main className="flex-grow container mx-auto">
							{children}
						</main>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
