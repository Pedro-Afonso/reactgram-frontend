import { Box, Typography, Avatar, Paper } from "@mui/material";
import { IComments } from "../../interface/IPhoto";
import { uploads } from "../../utils";

interface ICommentItemProps {
  comment: IComments;
}

export const CommentItem: React.FC<ICommentItemProps> = ({ comment }) => {
  return (
    <Box width="100%" component={Paper} variant="outlined" padding={1}>
      <Box display="flex" justifyContent="start" alignItems="start" gap={1}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={comment.userImage && `${uploads}/users/${comment.userImage}`}
          alt={comment.userName}
        />
        <Box paddingRight={1}>
          <Typography display="inline" fontWeight={600} fontSize={16}>
            {comment.userName}
          </Typography>
          <Typography display="inline" fontSize={16}>
            {" "}
            {comment.comment}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
