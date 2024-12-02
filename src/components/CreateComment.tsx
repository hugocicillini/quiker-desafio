'use client';

import { addComment } from '@/lib/action';
import { useActionState } from 'react';

const CreateComment = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const [state, formAction] = useActionState(addComment, undefined);

  return (
    <form className="flex flex-col w-full mt-4" action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="userId" value={userId} />
      <textarea
        name="desc"
        id="desc"
        placeholder="Escreva seu comentário..."
        className="resize-none p-2 bg-gray-700 rounded-md text-white"
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg"
      >
        Comentar
      </button>
      {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
    </form>
  );
};

export default CreateComment;
