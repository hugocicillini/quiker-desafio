'use server';

import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { signIn, signOut } from './auth';
import { Comment, Post, User } from './models';
import { connectToDb } from './utils';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export const addUser = async (prevState: any, formData: FormData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();

    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();

    return { success: true };
  } catch (err) {
    return { error: 'Falha ao criar usuário!' };
  }
};

export const editUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  if (!id) {
    return { error: 'Usuário não encontrado!' };
  }

  try {
    connectToDb();

    const updatedUser = await User.findByIdAndUpdate(id, formData, {
      new: true,
    });

    if (!updatedUser) {
      return { error: 'Usuário não encontrado!' };
    }

    return { success: true };
  } catch (err) {
    return { error: 'Falha ao editar usuario!' };
  }
};

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return { error: 'Usuário não encontrado!' };
    }
  } catch (err) {
    return { error: 'Falha ao deletar usuário!' };
  }
};

export const addPost = async (prevState: any, formData: FormData) => {
  const { userId, title, desc, img, slug } = Object.fromEntries(formData);

  try {
    await connectToDb();

    const existingPost = await Post.findOne({ slug });

    if (existingPost) {
      return { error: 'Post já existe!' };
    }

    const newPost = new Post({
      userId,
      title,
      desc,
      img,
      slug,
    });

    await newPost.save();

    revalidatePath('/blog');

    return { success: true };
  } catch (err) {
    console.error('Erro ao criar post:', err);
    return { error: 'Falha ao criar post!' };
  }
};

export const editPost = async (prevState: any, formData: FormData) => {
  const { postId, title, desc, img, slug } = Object.fromEntries(formData);

  if (!postId) {
    return { error: 'Post não encontrado!' };
  }

  try {
    connectToDb();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, desc, img, slug },
      {
        new: true,
      }
    );

    revalidatePath(`/blog/${slug}`);

    return { success: true };
  } catch (err) {
    return { error: 'Falha ao editar post!' };
  }
};

export const deletePost = async (formData: FormData) => {
  const { postId } = Object.fromEntries(formData);

  try {
    connectToDb();

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return { error: 'Post não encontrado!' };
    }
  } catch (err) {
    return { error: 'Falha ao deletar post!' };
  }
};

export const addComment = async (prevState: any, formData: FormData) => {
  const { userId, postId, desc } = Object.fromEntries(formData);

  try {
    connectToDb();

    const newComment = new Comment({
      userId,
      postId,
      desc,
    });

    await newComment.save();

    console.log(newComment);

    revalidatePath(`/post/${postId}`);

    return { success: true };
  } catch (err) {
    return { error: 'Falha ao criar comentário!' };
  }
};

export const editComment = async (prevState: any, formData: FormData) => {
  const { commentId, desc } = Object.fromEntries(formData);

  if (!commentId) {
    return { error: 'Comentário não encontrado!' };
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { desc },
      {
        new: true,
      }
    );

    if (!updatedComment) {
      return { error: 'Comentário não encontrado!' };
    }

    revalidatePath(`/post/${updatedComment.postId}`);

    return { success: true };
  } catch (err) {
    return { error: 'Falha ao editar comentário!' };
  }
};

export const deleteComment = async (formData: FormData) => {
  const { commentId, postId } = Object.fromEntries(formData);

  try {
    connectToDb();

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return { error: 'Comentário não encontrado!' };
    }

    revalidatePath(`/post/${postId}`);

    return { success: true };
  } catch (err) {
    return { error: 'Falha ao deletar comentário!' };
  }
};

export const handleGitHubLogin = async () => {
  'use server';
  await signIn('github');
};

export const handleLogout = async () => {
  'use server';
  await signOut();
};

export const login = async (prevState: any, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    revalidatePath('/');

    return { success: true };
  } catch (err) {
    return { error: 'Email ou senha inválidos!' };
  }
};

export const register = async (prevState: any, formData: FormData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: 'As senhas precisam ser iguais!' };
  }

  try {
    connectToDb();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { error: 'Email já cadastrado!' };
    }

    const passwordHash = await bcrypt.hash(password as string, 12);

    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
      img,
    });

    await newUser.save();

    return { success: true };
  } catch (error) {
    return { error: 'Algo deu errado!' };
  }
};
