'use client';

import { editComment } from '@/lib/action';
import { useActionState } from 'react';

const EditComments = ({
  commentId,
  desc,
  setModal,
}: {
  commentId: string;
  desc: string;
  setModal: (state: boolean) => void;
}) => {
  const [state, formAction] = useActionState(editComment, undefined);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
      <form
        action={formAction}
        className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-100">
          Editar Comentário
        </h2>
        <input type="hidden" name="commentId" value={commentId} />
        <textarea
          defaultValue={desc}
          name="desc"
          id="desc"
          rows={4}
          className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none shadow-sm"
          placeholder="Digite o novo comentário"
        />
        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            onClick={() => setModal(false)}
            className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComments;
