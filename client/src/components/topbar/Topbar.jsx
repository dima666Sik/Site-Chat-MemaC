import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

//
import { logoutCall } from '../../apiCalls'
//

export default function Topbar() {
  //
  const { user, dispatch } = useContext(AuthContext);
  //
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = () => {
    logoutCall(
      dispatch
    );
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Site-chat MemaC</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Link to="/" style={{ textDecoration: "none" , color:"white"}}>
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
          </div>
        </Link>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">7</span>
          </div>
          <Link to={'/messenger'} style={{ textDecoration: 'none', color: "white" }}>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">9</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">4</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <div className="topbarLink" onClick={handleClick}>
              <LogoutIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}