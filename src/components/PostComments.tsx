import ActionsComments from './ActionsComments';
import PostUser from './PostUser';

const PostComments = ({
  comments,
  session,
}: {
  comments: Comments[];
  session: any;
}) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="border-b border-gray-700 pb-4 mb-4">
            <div className="flex justify-between items-start">
              <PostUser userId={comment.userId} />
              {session?.user?.id === comment.userId && (
                <ActionsComments
                  commentId={comment._id}
                  desc={comment.desc}
                  postId={comment.postId}
                />
              )}
            </div>
            <p className="font-light text-sm pt-4 lg:text-base text-gray-300">
              {comment.desc}
            </p>
          </div>
        ))
      ) : (
        <p className="font-light text-sm lg:text-base text-gray-400">
          Nenhum comentário disponível.
        </p>
      )}
    </div>
  );
};

export default PostComments;
