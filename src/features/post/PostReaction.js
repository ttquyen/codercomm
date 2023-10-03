import { CardActions, IconButton, Typography } from "@mui/material";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useDispatch } from "react-redux";

function PostReaction({ post }) {
  const { like, dislike } = post?.reactions;

  const handleClick = (emoji) => {
    console.log(emoji);
  };
  return (
    <CardActions disableSpacing>
      <IconButton aria-label="like" onClick={() => handleClick("like")}>
        <ThumbUpOffAltIcon sx={{ fontSize: 20, color: "primary.main" }} />
      </IconButton>
      <Typography>{like}</Typography>
      <IconButton aria-label="dislike" onClick={() => handleClick("dislike")}>
        <ThumbDownOffAltIcon sx={{ fontSize: 20, color: "error.main" }} />
      </IconButton>
      <Typography>{dislike}</Typography>
    </CardActions>
  );
}

export default PostReaction;
