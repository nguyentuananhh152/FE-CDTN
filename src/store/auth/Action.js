import axios from "axios";
import {
	GET_USER_PROFILE_FAILURE,
	GET_USER_PROFILE_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS
} from "./ActionType";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loginUser = (loginData) => async (dispatch) => {
	try {
		const {data} = await axios.post(baseUrl + '/auth/login', loginData);

		if (data.status === 0) {
			localStorage.setItem("jwt", data.data.access_token);
			dispatch({type:LOGIN_USER_SUCCESS, payload: data.data.access_token});
			// toast.success("Login success", {autoClose: 2000, position: "top-right"});

			// get profile
			// const profileResponse = await axios.get(baseUrl + '/user/my-profile', {
			// 	headers: {
			// 		Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			// 	},
			// });
			//
			// if (profileResponse.data.status === 0) {
			// 	dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: profileResponse.data.data });
			// 	toast.info("Profile fetched successfully", { autoClose: 2000, position: "top-right" });
			// } else {
			// 	dispatch({ type: GET_USER_PROFILE_FAILURE, payload: profileResponse.data.message });
			// 	toast.error(profileResponse.data.message, { autoClose: 2000, position: "top-right" });
			// }
			// -----
			window.location.replace("/home")
		} else if (data.status === 1) {
			dispatch({type:LOGIN_USER_FAILURE, payload: data.message});
			// toast.error(data.message);
		}

	} catch (error) {
		toast(error.message, {autoClose: 2000, position: "top-right"});
		dispatch({type:LOGIN_USER_FAILURE, payload: error.message});
	}
}

export const registerUser = (registerData) => async (dispatch) => {
	try {
		const {data} = await axios.post(baseUrl + '/auth/register', registerData);

		if (data.status === 0) {
			dispatch({type:REGISTER_USER_SUCCESS, payload: data.data.access_token});
			toast.success("Register Success", {autoClose: 2000, position: "top-right"});
			window.location.replace("/signin")
		} else {
			dispatch({type:REGISTER_USER_FAILURE, payload: data.message})
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
		}

	} catch (error) {
		toast.error(error.message, {autoClose: 2000, position: "top-right"});
		dispatch({type:REGISTER_USER_FAILURE, payload: error.message})
	}
}

export const getUserProfile = () => async (dispatch) => {
	try {
		toast.info(`Bearer ${localStorage.getItem('jwt')}`)
		const {data} = await axios.get(baseUrl + '/user/my-profile', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			}
		});

		if (data.status === 0) {
			dispatch({type:GET_USER_PROFILE_SUCCESS, payload: data.data});
			toast.info("Success", {autoClose: 2000, position: "top-right"});
		} else {
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
			dispatch({type:GET_USER_PROFILE_FAILURE, payload: data.message})
		}

	} catch (error) {
		toast.error(error.message, {autoClose: 2000, position: "top-right"});
		dispatch({type:GET_USER_PROFILE_FAILURE, payload: error.message})
	}
}

export const logout = () => (dispatch) => {
	try {
		localStorage.removeItem("jwt")
		dispatch({type:LOGOUT_SUCCESS, payload: null})
		toast.success("Logout success", {autoClose: 2000, position: "top-right"});
	} catch (error) {
		dispatch({type:LOGOUT_FAILURE, payload: error.message})
		toast.error(error.message)
	}
}