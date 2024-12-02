import { editPost } from '@/lib/action';
import { useActionState } from 'react';

const EditPost = ({ postId, title, desc, img, slug, setModal }: any) => {
  const [state, formAction] = useActionState(editPost, undefined);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
      <form
        action={formAction}
        className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Editar Post
        </h2>

        <input type="hidden" name="postId" value={postId} />

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={title}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="block text-sm font-medium">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            defaultValue={slug}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="img" className="block text-sm font-medium">
            URL da Imagem
          </label>
          <input
            type="text"
            name="img"
            id="img"
            defaultValue={img}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="desc" className="block text-sm font-medium">
            Descrição
          </label>
          <textarea
            name="desc"
            id="desc"
            rows={4}
            defaultValue={desc}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
        </div>

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

export default EditPost;
