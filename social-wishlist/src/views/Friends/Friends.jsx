import React, { useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
	acceptFriendRequest,
	getFriendRequests,
	getFriends,
	removeFriend,
	removeFriendRequest,
} from "../../firebase/queries/users";
import { useState } from "react";
import UserBrick from "../../components/UserBrick/UserBrick";
import "./Friends.css";
import { CircularProgress } from "@mui/material";

function Friends({ user, showRequests = true }) {
	const [friendRequests, setFriendRequests] = useState([]);
	const [friends, setFriends] = useState([]);
	const [loadingFriends, setLoadingFriends] = useState(false);
	const [disableActions, setDisableActions] = useState(false);

	useEffect(() => {
		// get user information for requests and friends
		setLoadingFriends(true);
		if (user && user.uid) {
			const promises = [];
			promises.push(getFriendRequests(user.uid).then((res) => setFriendRequests(res)));
			promises.push(getFriends(user.uid).then((res) => setFriends(res)));
			Promise.all(promises).then((res) => setLoadingFriends(false));
		}
	}, [user]);

	const handleAcceptFriendRequest = async (e, userBrick) => {
		try {
			setDisableActions(true);
			await acceptFriendRequest(userBrick.uid, user.uid);
			setFriends([userBrick, ...friends]);
			setFriendRequests(friendRequests.filter((fr) => fr.uid !== userBrick.uid));
		} catch (error) {
			console.error("Error accepting request. Try again later", error.message);
		} finally {
			setDisableActions(false);
		}
	};
	const handleRemoveFriendRequest = async (e, userBrick) => {
		try {
			setDisableActions(true);
			await removeFriendRequest(userBrick.uid, user.uid);
			setFriendRequests(friendRequests.filter((fr) => fr.uid !== userBrick.uid));
		} catch (error) {
			console.error("Error removing request. Try again later", error.message);
		} finally {
			setDisableActions(false);
		}
	};
	const handleRemoveFriend = async (e, userBrick) => {
		try {
			setDisableActions(true);
			await removeFriend(user.uid, userBrick.uid);
			setFriends(friends.filter((fr) => fr.uid !== userBrick.uid));
		} catch (error) {
			console.error("Error removing friend. Try again later", error.message);
		} finally {
			setDisableActions(false);
		}
	};

	/*
	action = {
		bgColor: String,
		icon: SVGComponent,
		onClick: function
	}
	*/
	const friendRequestActions = [
		{
			icon: <DoneIcon />,
			onClick: handleAcceptFriendRequest,
		},
		{
			icon: <ClearIcon />,
			onClick: handleRemoveFriendRequest,
		},
	];

	const friendActions = [
		{
			icon: <PersonRemoveIcon />,
			onClick: handleRemoveFriend,
		},
	];

	return (
		<div className="main-box friends-box">
			{loadingFriends ? (
				<div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
					<CircularProgress color="primary" />
				</div>
			) : (
				<>
					{showRequests && (
						<section>
							<h3>Requests</h3>
							{friendRequests.map((friendRequest, i) => (
								<UserBrick
									key={i}
									user={friendRequest}
									actions={friendRequestActions}
									disableActions={disableActions}
								/>
							))}
						</section>
					)}
					<section>
						<h3>Friends</h3>
						{friends.map((friend, i) => (
							<UserBrick key={i} user={friend} actions={friendActions} disableActions={disableActions} />
						))}
					</section>
				</>
			)}
		</div>
	);
}

export default Friends;
