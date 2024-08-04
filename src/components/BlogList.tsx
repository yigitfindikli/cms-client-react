"use client";

import Link from "next/link";
import { Post } from "../types/post";
import { useAuth } from "@/providers/AuthProvider";
import { isUserAdmin } from "@/utils/userValidations";

interface BlogListProps {
	posts: Post[] | [];
	onDelete?: (id: string) => void;
	showActionButtons?: boolean;
}

const BlogList = ({ posts, onDelete, showActionButtons }: BlogListProps) => {
	const { user } = useAuth();

	return (
		<div className="p-6 bg-gray-100 h-full">
			<h1 className="text-2xl font-bold mb-4">Posts</h1>
			{user && (
				<Link
					href="/posts/create"
					className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
				>
					Create New Post
				</Link>
			)}
			{posts.length ? (
				<ul className="grid grid-cols-1 gap-4">
					{posts.map((post: Post) => (
						<li
							key={post.id}
							className="bg-white p-4 shadow rounded-lg"
						>
							<h2 className="text-lg font-bold mb-2">
								<Link
									href={`/posts/${post.id}`}
									className="text-blue-600 hover:underline"
								>
									{post.title}
								</Link>
							</h2>
							<p className="text-gray-700 mb-2">{post.content}</p>
							<p className="text-gray-500 text-sm">
								Created At:{" "}
								{new Date(post.createdAt).toLocaleString()} -
								Updated At:{" "}
								{new Date(post.updatedAt).toLocaleString()}
							</p>
							{showActionButtons && (
								<div className="mt-2 space-x-2">
									<Link
										href={`/posts/${post.id}/edit`}
										className="text-yellow-500 hover:underline"
									>
										Edit
									</Link>
									<button
										onClick={() =>
											onDelete && onDelete(post.id)
										}
										className="text-red-500 hover:underline"
									>
										Delete
									</button>
								</div>
							)}
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-700">No posts available.</p>
			)}
		</div>
	);
};

export default BlogList;