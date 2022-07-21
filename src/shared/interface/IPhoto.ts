export interface IPhoto {
  image: string;
  title: string;
  likes: [];
  userId: string;
  userName: string;
  _id: string;
  comments: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IErrors {
  errors: string[];
}

export interface IPhotoResponse extends IPhoto, IErrors {}
