import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";

import {
  commentPhoto,
  getPhoto,
  likePhoto,
} from "../../shared/slices/photoSlice";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { LikeButton, PhotoItem } from "../../shared/components";
import { IUserIdToken } from "../../shared/interface";
import { uploads } from "../../shared/utils";
import { CommentItem } from "../../shared/components/CommentItem/CommentItem";
import { CommentForm } from "../../shared/components/CommentForm/CommentForm";

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { photo, loading, error, message } = useAppSelector(
    (state) => state.photo
  );

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId));
  };

  // Load photo data
  useEffect(() => {
    if (id) {
      dispatch(getPhoto(id));
    }
  }, [id]);

  const handleComment = (
    e: React.FormEvent<HTMLFormElement>,
    textComment: string
  ) => {
    e.preventDefault();

    if (!id) {
      return;
    }

    const commentData = {
      comment: textComment,
      id: id,
    };

    dispatch(commentPhoto(commentData));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Box
      maxWidth={700}
      marginX="auto"
      marginTop={10}
      paddingY={2}
      component={Paper}
    >
      {photo && (
        <>
          <PhotoItem photo={photo} />
          <LikeButton photo={photo} user={user} handleLike={handleLike} />
          <CommentForm handleComment={handleComment} />
          <Box>
            {photo.comments.map((comment, key) => (
              <CommentItem comment={comment} key={key} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
