import axios from "axios";
import { useRef } from "react";
import "./registration.css"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();
    const handleClick = async (e) => {
        const PAA = process.env.REACT_APP_ADDRESS_API;
        e.preventDefault();
        console.log("passwordAgain:" + passwordAgain.current.value);
        console.log("password:" + password.current.value);
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Password don`t match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post(`${PAA}auth/registration`, user)
                history("/login");
            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Site-chat MemaC</h3>
                    <span className="loginDesc">
                        Connect with friends and communicate and laught together on MemaC
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <form className="loginBox" onSubmit={handleClick}>
                            <input
                                placeholder="Username"
                                required
                                className="loginInput"
                                ref={username}
                            />
                            <input
                                placeholder="Email"
                                required
                                className="loginInput"
                                type="email"
                                ref={email}
                            />
                            <input
                                placeholder="Password"
                                required
                                className="loginInput"
                                type="password"
                                minLength="6"
                                ref={password}
                            />
                            <input
                                placeholder="Password Again"
                                required
                                className="loginInput"
                                type="password"
                                ref={passwordAgain}
                            />
                            <button className="loginButton" type="submit">
                                <Link to={'/login'} style={{ textDecoration: 'none', color: "white" }}>
                                    Sign Up
                                </Link>
                            </button>
                            <button className="loginRegisterButton">Log into Account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
