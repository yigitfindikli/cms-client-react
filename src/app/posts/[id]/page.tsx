import { getPostById } from "@/services/postService";
import { Post } from "@/types/post";

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const post: Post = await getPostById(id);

	if (!post)
		return <div className="text-center text-red-500">Post not found</div>;

	return (
		<div className="flex flex-col items-center justify-center h-full bg-gray-100">
			<div className="w-full max-w-2xl p-8 bg-white rounded shadow-md">
				<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
				<p className="text-gray-700 mb-4">{post.content}</p>
				<p className="text-gray-500">
					Author: {post.author.firstName} {post.author.lastName}
				</p>
			</div>
		</div>
	);
};

export default PostDetailPage;
