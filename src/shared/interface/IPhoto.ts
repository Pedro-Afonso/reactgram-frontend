export interface IComments {
  comment: string;
  userName: string;
  userImage: string;
  userId: string;
  _id: string;
}

export interface IPhoto {
  image: string;
  title: string;
  likes: string[];
  userId: string;
  userName: string;
  _id: string;
  comments: IComments[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPhotoState {
  photos: IPhoto[];
  photo: IPhoto | null;
  error: string | null;
  success: boolean;
  loading: boolean;
  message?: string | null;
}

export interface IErrors {
  errors: string[];
}

export interface IMessage {
  message: string;
}

export interface IPhotoResponse extends IPhoto, IErrors {}

export interface IMessageAndId {
  _id: string;
  message: string;
}

export interface IDeleteResponse extends IMessageAndId, IErrors {}

export interface IPhotoMessageErrors extends IPhoto, IMessage, IErrors {}

export interface ILike {
  photoId: string;
  userId: string;
  message: string;
}

export interface ILikeErrors extends ILike, IErrors {}

export interface IComment {
  comment: {
    comment: string;
    userName: string;
    userImage: string;
    userId: string;
  };
}

export interface ICommentsMessageErrors extends IComments, IMessage, IErrors {}
export interface ICommentMessageErrors extends IComment, IMessage, IErrors {}
export interface IPhotoMessageErrors extends IComment, IMessage, IErrors {}
