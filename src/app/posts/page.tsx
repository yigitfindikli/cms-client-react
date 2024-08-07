import { getPostsByAuthor } from "@/services/postService";
import BlogList from "@/components/BlogList";
import { Post } from "@/types/post";
import { getCurrentUser } from "@/services/authService";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PostsPage = async () => {
	const headersList = headers();
	const cookies = headersList.get("cookie") || "";
	const user = await getCurrentUser({ cookie: cookies });

	if (!user) {
		redirect("/login");
	}

	const posts: Post[] = await getPostsByAuthor(user.id.toString());

	return (
		<div>
			<BlogList posts={posts} showActionButtons={true} />
		</div>
	);
};

export default PostsPage;
