import { addPost } from '@/lib/action';
import { auth } from '@/lib/auth';
import { useActionState } from 'react';

const CreatePostForm = ({
  session,
  setModal,
}: {
  session: any;
  setModal: (state: boolean) => void;
}) => {
  const [state, formAction] = useActionState(addPost, undefined);

  const handleSubmit = () => {
    if (state?.success) {
      setModal(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full mt-6 from-gray-800 to-gray-900 p-4 "
      action={formAction}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
        Criar Post
      </h2>

      <input type="hidden" name="userId" value={session?.user?.id} />

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Título
        </label>
        <input
          type="text"
          name="title"
          id="title"
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
          Publicar
        </button>
      </div>
      {state?.error && (
        <p className="text-red-500 mt-3 text-sm font-medium">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500 mt-3 text-sm font-medium">
          Comentário publicado com sucesso!
        </p>
      )}
    </form>
  );
};

export default CreatePostForm;
