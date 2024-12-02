'use client';

import { useState } from 'react';
import EditPost from './EditPost';
import DeletePosts from './DeletePosts';

const ActionsPosts = ({ post }: { post: Post }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="flex gap-4 text-sm text-gray-400">
        <DeletePosts postId={post._id} />
        <button
          onClick={() => setModal(true)}
          className="text-blue-500 hover:text-blue-300"
        >
          ✏️
        </button>
      </div>

      {modal && (
        <EditPost
          postId={post._id}
          title={post.title}
          desc={post.desc}
          img={post.img}
          slug={post.slug}
          setModal={setModal}
        />
      )}
    </>
  );
};

export default ActionsPosts;
