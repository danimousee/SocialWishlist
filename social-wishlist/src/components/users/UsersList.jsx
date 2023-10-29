import { Box, CircularProgress, ImageList } from "@mui/material";
import { useSelector } from "react-redux";
import "./Users.css"
import UserBrick from "../UserBrick/UserBrick";

const UsersList = () => {
  const { users, loading } = useSelector((state) => state.users);

  const renderUsers = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      );
    } else if (users.length > 0) {
      return users.map((user, i) => (
          <UserBrick key={i} user={user} />
      ));
    }
  };

  return <div className="users-container">{renderUsers()}</div>;
};

export default UsersList;
