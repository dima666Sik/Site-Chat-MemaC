import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router"

export default function Profile() {
    const [user, setUser] = useState({}); 
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const PAA = process.env.REACT_APP_ADDRESS_API;
    const username = useParams().username;


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${PAA}users?username=${username}`)
            setUser(res.data);
        }
        fetchUser();
    }, [username])
    console.log(user.profilePicture);
    return (
        <>
            <Topbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileTop">
                        <div className="profileCover">
                        {/* `${PF}post/3.jpeg` */}
                            <img className="profileCoverImg" src={user.coverPicture ?PF+user.coverPicture: PF+"person/noCover.png"} alt="" />
                            <img className="profileUserImg" src={user.profilePicture ?PF+user.profilePicture: PF+"person/noAvatar.png"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>

            </div>
        </>
    )
}
