import { fetchWrapper } from "@/utils/fetch";
import type {
	CreatePostData,
	UpdatePostData,
	CreatePostResponse,
	UpdatePostResponse,
	Post
} from "../types/post";

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
	return await fetchWrapper(`/post/${data.id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	});
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
