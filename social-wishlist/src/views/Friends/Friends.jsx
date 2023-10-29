import React, { useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { acceptFriendRequest, getFriendRequests, getFriends, removeFriend, removeFriendRequest } from "../../firebase/queries/users";
import { useState } from "react";
import UserBrick from "../../components/UserBrick/UserBrick";
import "./Friends.css";
import { CircularProgress } from "@mui/material";

function Friends({ user }) {
	const [friendRequests, setFriendRequests] = useState([]);
	const [friends, setFriends] = useState([]);
	const [loadingFriends, setLoadingFriends] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const refreshView = () => {
		setRefresh(!refresh);
	}

	useEffect(() => {
		// get user information for requests and friends
		setLoadingFriends(true);
		if (user && user.uid) {
			const promises = [];
			promises.push(getFriendRequests(user.uid).then((res) => setFriendRequests(res)));
			promises.push(getFriends(user.uid).then((res) => setFriends(res)));
			Promise.all(promises).then((res) => setLoadingFriends(false));
		}
	}, [user, refresh]);

	const handleAcceptFriendRequest = async (e, userBrick) => {
		try {
			acceptFriendRequest(userBrick.uid, user.uid);
			setFriends([userBrick, ...friends]);
			setFriendRequests(friendRequests.filter(fr => fr.uid !== userBrick.uid));
		} catch (error) {
			console.error("Error accepting request. Try again later" );
		}
	};
	const handleRemoveFriendRequest = (e, userBrick) => {
		try {
			removeFriendRequest(userBrick.uid, user.uid);
			setFriendRequests(friendRequests.filter(fr => fr.uid !== userBrick.uid));
		} catch (error) {
			console.error("Error removing request. Try again later" );
		}
	};
	const handleRemoveFriend = (e, userBrick) => {
		try {
			removeFriend(user.uid, userBrick.uid);
			setFriends(friends.filter(fr => fr.uid !== userBrick.uid));
		} catch (error) {
			console.error("Error removing friend. Try again later" );
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
				<div style={{height:'90vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<CircularProgress color="primary" />
				</div>
			) : (
				<>
					<section>
						<h3>Requests</h3>
						{friendRequests.map((friendRequest, i) => (
							<UserBrick key={i} user={friendRequest} actions={friendRequestActions} />
						))}
					</section>
					<section>
						<h3>Friends</h3>
						{friends.map((friend, i) => (
							<UserBrick key={i} user={friend} actions={friendActions} />
						))}
					</section>
				</>
			)}
		</div>
	);
}

export default Friends;
