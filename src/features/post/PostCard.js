import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fDateTime } from "../../utils/formatTime";
import { Link as RouterLink } from "react-router-dom";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";

function PostCard({ post }) {
  const { author, updatedAt, image, content, _id } = post;
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="avatar"
            src={author?.avatarUrl}
            alt={author?.name}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            fontWeight={600}
            to={`/user/${author?._id}`}
          >
            {author.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDateTime(updatedAt)}
          </Typography>
        }
      />
      <Stack spacing={1} sx={{ p: 1 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        {image && (
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt="post image"
            sx={{
              p: 1,
              borderRadius: 2,
              "& img": {
                objectFit: "cover",
                width: 1,
                height: 1,
                overflow: "hidden",
              },
            }}
          />
        )}
        <PostReaction post={post} />
        <CommentList postId={_id} />
        <CommentForm postId={_id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
