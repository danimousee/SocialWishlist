import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import "./Users.css";
import UserBrick from "../UserBrick/UserBrick";

const UsersList = () => {
  const { users, loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.user);

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
      return users.map((u, i) => {
        if (u.uid !== user.uid) {
          return <UserBrick key={i} user={u} />;
        }
      });
    }
  };

  return <div className="users-container">{renderUsers()}</div>;
};

export default UsersList;
