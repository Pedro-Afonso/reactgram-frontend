import { LoadingButton } from "@mui/lab";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LikeButton } from "../../shared/components";
import { PhotoItem } from "../../shared/components/PhotoItem/PhotoItem";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { IUserIdToken } from "../../shared/interface";
import { commentPhoto, getPhoto, likePhoto } from "../../shared/slices";
import { uploads } from "../../shared/utils";

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth) as {
    user: IUserIdToken;
  };
  const { photo, loading, error, message } = useAppSelector(
    (state) => state.photo
  );

  const [textComment, setTextComment] = useState("");

  const handleLike = (photoId: string) => {
    dispatch(likePhoto(photoId));
  };

  // Load photo data
  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(getPhoto(id));
    }
    console.log(photo);
  }, [id]);

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      return;
    }

    const commentData = {
      comment: textComment,
      id: id,
    };

    dispatch(commentPhoto(commentData));

    setTextComment("");
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
          <form onSubmit={handleComment}>
            <Box width="100%" padding={2}>
              <Box>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Deixe o seu comentário:"
                  type="text"
                  value={textComment}
                  onChange={(e) => setTextComment(e.target.value)}
                />
              </Box>
              <Box marginTop={4}>
                <LoadingButton type="submit" fullWidth variant="contained">
                  Enviar
                </LoadingButton>
              </Box>
            </Box>
          </form>
          <Box>
            {photo.comments.map((comment, key) => (
              <Box width="100%" padding={2} key={key}>
                <Typography>{comment.comment}</Typography>
                <Box>
                  <Typography>{comment.userName}</Typography>
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={`${uploads}/users/${comment.userImage}`}
                    alt={comment.userName}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};
