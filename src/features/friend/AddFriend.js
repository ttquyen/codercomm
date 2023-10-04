import {
  Box,
  Card,
  Container,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersListAsync } from "./friendSlice";
import SearchInput from "./SearchInput";
import UsersTable from "./UsersTable";

function AddFriend() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const {
    usersById,
    currentPageUsers,
    count: totalUsers,
  } = useSelector((state) => state.friend);
  const users = currentPageUsers.map((userId) => usersById[userId]);
  // getUsersListAsync
  useEffect(() => {
    dispatch(
      getUsersListAsync({
        page: page + 1,
        limit: rowsPerPage,
        name: filterName,
      })
    );
  }, [filterName, rowsPerPage, page, dispatch]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                ? `${totalUsers} users found`
                : totalUsers === 1
                ? `${totalUsers} user found`
                : "No users found"}
            </Typography>

            <Box sx={{ flexGrow: 1 }}></Box>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={totalUsers ? totalUsers : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Stack>
        <UsersTable users={users} />
      </Card>
    </Container>
  );
}

export default AddFriend;
