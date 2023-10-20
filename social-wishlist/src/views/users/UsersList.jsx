import { Box, CircularProgress, ImageList } from "@mui/material";
import { useSelector } from "react-redux";
import "./Users.css"

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
          <CircularProgress color="secondary" />
        </Box>
      );
    } else if (users.length > 0) {
      return users.map((user, i) => (
        <div key={i} className="user-preview">
          <img src={user?.photoURL} />
          <p>{user?.displayName}</p>
        </div>
      ));
    }
  };

  return <div className="users-container">{renderUsers()}</div>;
};

export default UsersList;
