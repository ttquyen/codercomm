import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendListAsync } from "./friendSlice";
import {
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import SearchInput from "./SearchInput";
import UserCard from "./UserCard";

function FriendList() {
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
  useEffect(() => {
    dispatch(
      getFriendListAsync({
        page: page,
        name: filterName,
      })
    );
  }, [filterName, page, dispatch]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add Friends
      </Typography>
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

            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
            />
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

export default FriendList;
