import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserByIdAsync } from "../features/user/userSlice";
import { Card, Container } from "@mui/material";
import LoadingScreen from "./LoadingScreen";
import ProfileCover from "../features/user/ProfileCover";
import Profile from "../features/user/Profile";

function UserProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );
  useEffect(() => {
    if (userId) {
      dispatch(getUserByIdAsync({ id: userId }));
    }
  }, [userId, dispatch]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Card sx={{ mb: 3, height: 300, position: "relative" }}>
            {selectedUser && <ProfileCover profile={selectedUser} />}
          </Card>
          <Profile profile={selectedUser} />
        </>
      )}
    </Container>
  );
}

export default UserProfilePage;
