import {
  Avatar,
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import FriendStatus from "./FriendStatus";
import FriendAction from "./FriendAction";

function UsersTable({ users }) {
  const { user } = useAuth();

  const getActionAndStatus = (targetUser) => {
    const props = {
      currentUserId: user?._id,
      targetUserId: targetUser?._id,
      friendship: targetUser?.friendship,
    };
    // currentUserId, targetUserId, friendship, sx
    return {
      status: <FriendStatus {...props} />,
      action: <FriendAction {...props} />,
    };
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                Name
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Email
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Job Title
              </TableCell>
              <TableCell
                sx={{ display: { xs: "none", sm: "table-cell" }, width: "20%" }}
              >
                Status
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => {
              const { status, action } = getActionAndStatus(row);
              return (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      sx={{ mr: 2 }}
                      aria-label="avatar"
                      src={row?.avatarUrl}
                      alt={row?.name}
                    />
                    <Link
                      variant="subtitle2"
                      fontWeight={600}
                      component={RouterLink}
                      to={`user/${row._id}`}
                    >
                      {row.name}
                    </Link>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.jobTitile}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>{action}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UsersTable;
