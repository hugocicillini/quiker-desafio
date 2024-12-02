import { Post, User, Comment } from './models';
import { connectToDb } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export const getPosts = async () => {
  try {
    connectToDb();

    const posts = await Post.find();

    return posts;
  } catch (err) {
    throw new Error('Falha ao buscar posts!');
  }
};

export const getPost = async (slug: string) => {
  try {
    connectToDb();

    const post = await Post.findOne({ slug });

    if (!post) {
      throw new Error('Post não encontrado!');
    }

    return {
      _id: post._id.toString(),
      title: post.title,
      desc: post.desc,
      img: post.img,
      userId: post.userId,
      slug: post.slug,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
    
  } catch (err) {
    throw new Error('Falha ao buscar posts!');
  }
};


export const getUser = async (id: string) => {
  noStore();

  try {
    connectToDb();

    const user = await User.findById(id);

    return user;
  } catch (err) {
    throw new Error('Falha ao buscar usuario!');
  }
};

export const getUsers = async () => {
  try {
    connectToDb();

    const users = await User.find();

    return users;
  } catch (err) {
    throw new Error('Falha ao buscar usuarios!');
  }
};

export const getComments = async (id: string) => {
  try {
    connectToDb();

    const comments = await Comment.find({ postId: id });

    const simpleComments = comments.map((comment) => ({
      _id: comment._id.toString(),
      desc: comment.desc,
      postId: comment.postId,
      userId: comment.userId,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    }));

    simpleComments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return simpleComments;
  } catch (err) {
    throw new Error('Falha ao buscar comentários!');
  }
};
