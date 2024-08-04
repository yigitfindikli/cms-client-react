import { RoleType } from "@/enums/role";
import { Post } from "@/types/post";
import { User } from "@/types/user";

export const isUserAdmin = (user: User | null): boolean => {
	if (!user) return false;

	return user.role?.name === RoleType.Admin;
};

export const isUserAuthor = (user: User | null, post: Post | null): boolean => {
	if (!user || !post) return false;

	return user.id === post.author.id;
};
