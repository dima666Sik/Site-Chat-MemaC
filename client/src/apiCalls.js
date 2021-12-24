import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    const PAA = process.env.REACT_APP_ADDRESS_API;
    dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${PAA}auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    // console.log({payload:res.data});
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
//
export const logoutCall = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
//