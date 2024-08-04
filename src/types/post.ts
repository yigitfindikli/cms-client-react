import type { User } from "./user";

export interface Post {
	id: string;
	title: string;
	content: string;
	author: User;
	createdAt: string;
	updatedAt: string;
}

export interface CreatePostData {
	title: string;
	content: string;
}

export interface UpdatePostData {
	id: string;
	title: string;
	content: string;
}

export interface CreatePostResponse {
	id: string;
	title: string;
	content: string;
	author: User;
}

export interface UpdatePostResponse {
	id: string;
	title: string;
	content: string;
	author: User;
}
