import "./post.css"
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Users } from "../../dummyData"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const PAA = process.env.REACT_APP_ADDRESS_API;
    const {user:currentUser} = useContext(AuthContext);
   useEffect(()=>{
       setIsLiked(post.likes.includes(currentUser._id));
   },[currentUser._id,post.likes])
   
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${PAA}users?userId=${post.userId}`)
            setUser(res.data);
        }
        fetchUser();
    },  [post.userId])

    // console.log(PF)
    const likeHandler = () => {
        try{
            axios.put(`${PAA}posts/`+post._id+"/like",{userId:currentUser._id})
        }catch(e){

        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    // console.log(PF);
    // console.log(post);
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>

                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            className="likeIcon"
                            src={`${PF}heart.png`}
                            // onClick={likeHandler}
                            alt=""
                            onClick={likeHandler}
                        />
                        {/* <img
                            className="likeIcon"
                            src="/assets/brokenHeart.png"
                            // onClick={likeHandler}
                            alt=""
                            onClick={likeHandler}
                        /> */}
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
