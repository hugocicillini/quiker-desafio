type Post = {
  _id: string;
  title: string;
  desc: string;
  img?: string;
  userId: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

type Comments = {
  _id: string;
  desc: string;
  postId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  username: string;
  email: string;
  password: string;
  img?: string;
};

type Credentials = {
  email: string;
  password: string;
}