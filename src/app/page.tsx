import BlogList from "@/components/BlogList";
import { getCurrentUser } from "@/services/authService";
import { getAllPosts } from "@/services/postService";
import { Post } from "@/types/post";
import { isUserAdmin } from "@/utils/userValidations";
import { AppProps } from "next/app";
import { headers } from "next/headers";

export const home = async ({ Component, pageProps }: AppProps) => {
	const headersList = headers();
	const cookies = headersList.get("cookie") || "";

	const user = await getCurrentUser({ cookie: cookies });
	const posts: Post[] = await getAllPosts();

	return <BlogList posts={posts} showActionButtons={isUserAdmin(user)} />;
};

export default home;
