"use client";

import { useForm } from "react-hook-form";
import { CreatePostData, UpdatePostData } from "../types/post";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/services/PostService";

interface PostFormProps {
	initialValues?: CreatePostData | UpdatePostData;
}

const PostForm = ({ initialValues }: PostFormProps) => {
	const router = useRouter();

	const { register, handleSubmit, reset } = useForm<CreatePostData>({
		defaultValues: initialValues || { title: "", content: "" }
	});

	const onSubmit = async (data: CreatePostData) => {
		try {
			if (initialValues && "id" in initialValues) {
				const post: UpdatePostData = { ...data, id: initialValues.id };

				await updatePost(post);

				router.push(`/posts/${initialValues.id}`);
			} else {
				await createPost(data);

				router.push("/posts");
			}
		} catch (error) {
			console.error("Failed to save post:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-lg w-full mx-auto p-4 bg-white shadow-md rounded"
		>
			<div className="mb-4">
				<label
					htmlFor="title"
					className="block text-gray-700 font-bold mb-2"
				>
					Title
				</label>
				<input
					id="title"
					{...register("title")}
					type="text"
					required
					className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="content"
					className="block text-gray-700 font-bold mb-2"
				>
					Content
				</label>
				<textarea
					id="content"
					{...register("content")}
					required
					className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
			>
				Submit
			</button>
		</form>
	);
};

export default PostForm;
