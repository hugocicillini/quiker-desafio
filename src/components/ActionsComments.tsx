'use client';

import { useState } from 'react';
import DeleteComments from './DeleteComments';
import EditComments from './EditComments';

const ActionsComments = ({
  commentId,
  desc,
  postId,
}: {
  commentId: string;
  desc: string;
  postId: string;
}) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="flex gap-4 text-sm text-gray-400">
        <DeleteComments commentId={commentId} postId={postId} />
        <button
          onClick={() => setModal(true)}
          className="text-blue-500 hover:text-blue-300"
        >
          ✏️
        </button>
      </div>

      {modal && (
        <EditComments commentId={commentId} desc={desc} setModal={setModal} />
      )}
    </>
  );
};

export default ActionsComments;
