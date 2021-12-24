import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import Topbar from "../../components/topbar/Topbar"
import { AuthContext } from "../../context/AuthContext"
import "./messenger.css"
import { io } from "socket.io-client";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const { user } = useContext(AuthContext)
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [comp, setComp] = useState({});
    // console.log(user);
    const [newMessage, setNewMessage] = useState("");
    const PAA = process.env.REACT_APP_ADDRESS_API;
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            console.log(checkCompanion());
            let param = checkCompanion();
            const res = await axios.get(`${PAA}users?userId=${param}`)
            setComp(res.data);
        }
        fetchUser();
    }, );


    //    console.log(socket);
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            console.log(users);
        });
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${PAA}conversations/` + user._id);
                setConversations(res.data);
                // console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);


    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${PAA}messages/` + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        //
        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );
        //
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post(`${PAA}messages`, message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    const checkCompanion = () => {
        for (let i = 0; i < currentChat.members.length; i++) {
            if (currentChat.members[i] !== user._id) {
                return currentChat.members[i];
            }
        }
        // return currentChat.members
    }
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation conversations={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ?
                            (<>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <Message message={m} own={m.sender === user._id} currentUser={user} companion={comp} />
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatMessageInput" placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                </div>
                            </>) : (<span className="noConversationText">Create conversation</span>)
                        }

                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnline">
                        <div className="chatOnlineWrapper">
                            <ChatOnline />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
