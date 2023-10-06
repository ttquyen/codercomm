import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendRequestListAsync } from "./friendSlice";
import {
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchInput from "./SearchInput";
import UserCard from "./UserCard";

function FriendRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    usersById,
    currentPageUsers,
    count: totalUsers,
    totalPages,
  } = useSelector((state) => state.friend);
  const users = currentPageUsers.map((userId) => usersById[userId]);

  const [alignment, setAlignment] = React.useState("incoming");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    dispatch(
      getFriendRequestListAsync({
        page: page,
        name: filterName,
        requestType: alignment,
      })
    );
  }, [filterName, page, dispatch, alignment]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friend Requests
      </Typography>
      <Stack alignItems="center">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="incoming">Incoming Requests</ToggleButton>
          <ToggleButton value="outgoing">Outgoing Requests</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} friends found`
                : totalUsers === 1
                ? `${totalUsers} friend found`
                : "No users found"}
            </Typography>

            {totalUsers > 1 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </Stack>
        </Stack>
        <Grid container spacing={3} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default FriendRequests;
