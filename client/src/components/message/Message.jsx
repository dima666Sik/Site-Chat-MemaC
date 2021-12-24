import "./message.css"
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({message, own, currentUser,companion}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={ own? PF+currentUser.profilePicture?PF + currentUser.profilePicture:
                        PF + "person/noAvatar.png":companion.profilePicture?PF+companion.profilePicture:PF+"person/noAvatar.png"}
                    alt=""
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
