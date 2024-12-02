import { deletePost } from '@/lib/action';

const DeletePosts = ({ postId }: any) => {
  return (
    <form action={deletePost as any}>
      <input type="hidden" name="postId" value={postId} />
      <button type="submit" className="cursor-pointer hover:text-gray-200">
        🗑️
      </button>
    </form>
  );
};
export default DeletePosts;
