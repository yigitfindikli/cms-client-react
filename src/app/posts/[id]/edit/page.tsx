import { getPostById } from "@/services/postService";
import PostForm from "@/components/PostForm";

const EditPostPage = async ({ params }: { params: { id: string } }) => {
	if (!params.id) {
		return null;
	}

	const post = await getPostById(params.id);

	if (!post) {
		return null;
	}

	return (
		<div className="flex justify-center items-center w-full h-full">
			<PostForm initialValues={post} />
		</div>
	);
};

export default EditPostPage;
