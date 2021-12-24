import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext"
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";

export default function Login() {
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const email = useRef();
    const password = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({
            email: email.current.value,
            password: password.current.value
        },
            dispatch);
    }

    console.log(user);
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
                                placeholder="Email"
                                type="email"
                                required
                                className="loginInput"
                                ref={email}
                            />
                            <input
                                placeholder="Password"
                                type="password"
                                required
                                minLength="6"
                                className="loginInput"
                                ref={password}
                            />
                            <button className="loginButton" type="submit" disabled={isFetching}>
                                {isFetching ? <CircularProgress color="inherit" size="25px" /> : "Log In"}
                            </button>
                            <span className="loginForgot">Forgot Password?</span>
                            <button className="loginRegisterButton">
                                {isFetching ? (
                                    <CircularProgress color="inherit" size="25px" />
                                ) : (
                                    <Link to={'/registration'} style={{ textDecoration: 'none', color:"white" }}>
                                    Create a New Account
                                    </Link>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
