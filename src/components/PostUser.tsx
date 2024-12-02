import { getUser } from '@/lib/data';
import Image from 'next/image';

const PostUser = async ({ userId }: { userId: string }) => {
  const user: User = await getUser(userId);

  return (
    <div className="flex items-center gap-4">
      <Image
        src={user?.img || '/noavatar.png'}
        alt="Autor"
        width={48}
        height={48}
        className="object-cover w-12 h-12 rounded-full"
      />
      <div className="flex flex-col">
        <span className="font-light text-xs lg:text-sm">
          {user?.username || 'Usuário desconhecido'}
        </span>
      </div>
    </div>
  );
};

export default PostUser;
