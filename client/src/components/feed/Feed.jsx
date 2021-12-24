import "./feed.css"
import { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// import {Posts} from "../../dummyData"
export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const PAA = process.env.REACT_APP_ADDRESS_API;
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchPosts = async () => {
            console.log(username);
            const res = username ?
                await axios.get(`${PAA}posts/profile/` + username) :
                await axios.get(`${PAA}posts/timeline/` + user._id)
            setPosts(res.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            }));
        }
        fetchPosts();
    }, [username, user._id])

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username||username===user.username) && <Share />}

                {posts.map(p => (
                    <Post key={p._id} post={p} />
                ))}

            </div>
        </div>
    )
}
