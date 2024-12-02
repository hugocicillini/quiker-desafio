'use client';

import { useState } from 'react';
import CreatePostForm from './CreatePostForm';

const CreatePost = ({ session }: { session: any }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="mb-6 self-start bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
      >
        Novo Post +
      </button>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
            <button
              onClick={() => setModal(false)}
              className="absolute top-4 right-4 text-white"
            ></button>
            <CreatePostForm session={session} setModal={setModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
