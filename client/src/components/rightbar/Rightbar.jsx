import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"

export default function Rightbar({ user }) {
    // const [followed, setFollowed] = useState(
    //     false
    // );

    // useEffect(() => {
    //     setFollowed(currentUser.followings.includes(user?._id))
    // }, [currentUser, user._id])

    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const PAA = process.env.REACT_APP_ADDRESS_API;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(
        currentUser.followings.includes(user?._id)
    );

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`${PAA}users/friends/` + user._id)
                setFriends(friendList.data)
            } catch (e) {
                console.log(e);
            }
        };
        getFriends();
    }, [user])

    const handlerClick = async () => {
        try {
            if (followed) {
                await axios.put(`${PAA}users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`${PAA}users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    };

    const HomeRightbar = () => {
        return (
            <>
                <img className="rightbarWelcomeToSite" src="/assets/welcomeToSite.jpeg" alt="" />
                <h4 className="rightbarTitle">Your Friend Online:</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRighbar = () => {
        console.log("followed:" + followed);
        return (
            <>
                {user.username !== currentUser.username && (

                    <button className="rightbarFollowButton" onClick={handlerClick}>

                        {followed ? "Unfollow" : "Follow"}
                    </button>
                )}
                <h4 className="rightbarTitle">About user</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Stadied: </span>
                        <span className="rightbarInfoValue">{user.stady}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From: </span>
                        <span className="rightbarInfoValue"> {user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Hobby: </span>
                        <span className="rightbarInfoValue"> {user.hobby}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship: </span>
                        <span className="rightbarInfoValue"> {user.relationship === 1 ?
                            "Lost" : user.relationship === 2 ? "Married"
                                : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>

                    ))}
                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRighbar /> : <HomeRightbar />}
                {/* <ProfileRighbar/> */}
            </div>
        </div>
    )
}
