import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  acceptFriendRequestAsync,
  cancelFriendRequestAsync,
  declineFriendRequestAsync,
  deleteFriendAsync,
  sendFriendRequestAsync,
} from "./friendSlice";

function FriendAction({ currentUserId, targetUserId, friendship, sx }) {
  const dispatch = useDispatch();
  if (currentUserId === targetUserId) return null;
  const btnSendFriendRequest = (
    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      color="success"
      onClick={() => dispatch(sendFriendRequestAsync(targetUserId))}
    >
      Send request
    </Button>
  );

  const btnResend = (
    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      color="success"
      onClick={() => dispatch(sendFriendRequestAsync(targetUserId))}
    >
      {friendship?.from === currentUserId ? "Resend" : "Send"} request
    </Button>
  );

  const btnCancelRequest = (
    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(cancelFriendRequestAsync(targetUserId))}
    >
      Cancel request
    </Button>
  );

  const btnUnfriend = (
    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(deleteFriendAsync(targetUserId))}
    >
      Unfriend
    </Button>
  );

  const btnAccept = (
    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      color="success"
      onClick={() => dispatch(acceptFriendRequestAsync(targetUserId))}
    >
      Accept
    </Button>
  );
  const btnDecline = (
    <Button
      sx={{ fontSize: "0.6rem" }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(declineFriendRequestAsync(targetUserId))}
    >
      Decline
    </Button>
  );
  const btnGroupAction = (
    <Stack direction="row" spacing={1}>
      {btnDecline}
      {btnAccept}
    </Stack>
  );

  if (!friendship) return btnSendFriendRequest;
  if (friendship.status === "accepted") return btnUnfriend;
  if (friendship.status === "declined") return btnResend;
  if (friendship.status === "pending") {
    const { from, to } = friendship;
    if (from === currentUserId && to === targetUserId) return btnCancelRequest;
    else if (from === targetUserId && to === currentUserId)
      return btnGroupAction;
  }
  return btnSendFriendRequest;
}

export default FriendAction;
