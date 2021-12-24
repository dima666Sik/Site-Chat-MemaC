import axios from "axios";
import { useEffect, useState } from "react"
import "./conversation.css"

export default function Conversation({ conversations, currentUser }) {
    const [user, setUser] = useState(null)
    const PAA = process.env.REACT_APP_ADDRESS_API;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() => {
        console.log(currentUser);
        const friendId = conversations.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios(`${PAA}users?userId=` + friendId);
                setUser(res.data);
                // console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversations]);

    return (
        <div className="conversation">
            <img className="conversationImg" src={
                user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
            } alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}
