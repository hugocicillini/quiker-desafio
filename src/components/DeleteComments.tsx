import { deleteComment } from '@/lib/action';

const DeleteComments = ({ commentId, postId }: any) => {
  return (
    <form action={deleteComment as any}>
      <input type="hidden" name="commentId" value={commentId} />
      <input type="hidden" name="postId" value={postId.toString()} />
      <button type="submit" className="cursor-pointer hover:text-gray-200">
        🗑️
      </button>
    </form>
  );
};
export default DeleteComments;
