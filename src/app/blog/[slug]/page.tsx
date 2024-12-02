import ActionsPosts from '@/components/ActionsPosts';
import CreateComment from '@/components/CreateComment';
import PostComments from '@/components/PostComments';
import PostUser from '@/components/PostUser';
import { auth } from '@/lib/auth';
import { getComments, getPost } from '@/lib/data';
import Image from 'next/image';

const SinglePostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const post: Post = await getPost(slug);

  const comments: Comments[] = await getComments(post._id.toString());

  const session = await auth();

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 p-4 lg:p-8">
      <div className="flex-1 relative h-[50vh] lg:h-[calc(100vh-200px)]">

        <Image
          src={post?.img?.startsWith('https://images.pexels.com') ? post.img : '/noavatar.png'}
          priority
          alt="Post Image"
          width={500}
          height={500}
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-start justify-between">
          <h1 className="text-4xl lg:text-6xl font-bold">{post.title}</h1>
          {session?.user?.id === post.userId && <ActionsPosts post={post} />}
        </div>

        <div className="flex items-center gap-4 lg:gap-12">
          {post && <PostUser userId={post.userId} />}
          <div className="flex flex-col">
            <span className="text-gray-500 font-semibold text-sm lg:text-base">
              Publicado em
            </span>
            <span className="font-light text-xs lg:text-sm">
              {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="text-base lg:text-xl leading-relaxed mt-12">
          {post.desc}
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-gray-200 font-bold text-base lg:text-lg">
              Comentários
            </h2>
            <CreateComment
              postId={post._id.toString()}
              userId={session?.user?.id || ''}
            />
            <PostComments comments={comments} session={session} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
