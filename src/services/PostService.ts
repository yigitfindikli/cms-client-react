"use server";

import { fetchWrapper } from "@/utils/fetch";
import type {
	CreatePostData,
	UpdatePostData,
	CreatePostResponse,
	UpdatePostResponse,
	Post
} from "../types/post";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createPost = async (
	data: CreatePostData
): Promise<CreatePostResponse> => {
	return await fetchWrapper("/post", {
		method: "POST",
		body: JSON.stringify(data)
	});
};

export const updatePost = async (
	data: UpdatePostData
): Promise<UpdatePostResponse> => {
	const headerList = headers();
	const cookies = headerList.get("cookie") || "";
	const res = await fetchWrapper(`/post/${data.id}`, {
		headers: {
			cookie: cookies,
			"Content-Type": "application/json"
		},
		method: "PUT",
		body: JSON.stringify(data)
	});

	await revalidatePath(`/posts`);
	await revalidatePath(`/posts/${data.id}`);
	return res;
};

export const deletePost = async (id: string): Promise<void> => {
	await fetchWrapper(`/post/${id}`, {
		method: "DELETE"
	});
};

export const getPostById = async (id: string): Promise<Post> => {
	return await fetchWrapper(`/post/${id}`);
};

export const getAllPosts = async (): Promise<Post[]> => {
	return await fetchWrapper("/post");
};

export const getPostsByAuthor = async (userId: string): Promise<Post[]> => {
	return await fetchWrapper(`/post?userId=${userId}`);
};
