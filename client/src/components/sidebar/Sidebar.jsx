import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import GroupIcon from '@mui/icons-material/Group';
import { Users } from "../../dummyData"
import "./sidebar.css"
import Friend from '../friend/Friend';
import {Link} from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeedIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Link to={'/messenger'} style={{ textDecoration: 'none', color: "black" }}>
                            <ChatIcon className="sidebarIcon" />
                            <span className="sidebarListItemText">Chats</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleOutlineIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map(u => (
                        <Friend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    );
}