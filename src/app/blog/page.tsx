import CreatePost from '@/components/CreatePost';
import Posts from '@/components/Posts';
import { auth } from '@/lib/auth';

const Blog = async () => {
  const session = await auth();

  return (
    <>
      <CreatePost session={session} />
      <Posts />
    </>
  );
};
export default Blog;
