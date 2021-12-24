import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
  // user: {
  //   _id: "61ba22d8ec73e84ebcca700e",
  //   username: "kata",
  //   email: "kata@gmail.com",
  //   profilePicture: "person/3.jpeg",
  //   coverPicture: "",
  //   followers: [{
  //     // 0: "61ba22d8ec73e84ebcca700e"
  //   }],
  //   followings: [{
  //     // 0: "61ba22d8ec73e84ebcca700e"
  //   }
  //   ]
  // },
  // user:null,
  user: JSON.parse(localStorage.getItem("user"),(key,value)=>value!==undefined?value:null),
  isFetching: false,
  error: false,
};

console.log(INITIAL_STATE);

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user?state.user:null));
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user?state.user:null,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};