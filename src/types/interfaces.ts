export interface login {
  email: string;
  password: string;
}

export interface createPost {
  content: string;
  userId: number;
  date: string;
}
export interface editPostDados {
  content: string;
  userId?: number;
  date: string;
}
export interface register {
  name: string;
  email: string;
  password: string;
}

export interface deletePost {
  id: number;
  userId: number;
  user: number;
}

export interface editPost {
  id: number;
  userId: number;
  user: number;
  dados?: editPostDados;
}

export interface user {
  email: string;
  id: number;
  name: string;
}
export interface getPosts {
  id: number;
  content: string;
  date: Date;
  user: user;
}

export interface getUsers {
  id: number;
  name: string;
  email: string;
}

export interface getPost {
  id: number;
  content: string;
  date: Date;
  userId: number;
  name: string;
  user: getUsers[];
  getAllPosts: () => Promise<void>;
}

export interface userProps {
  user: getUsers[];
}

