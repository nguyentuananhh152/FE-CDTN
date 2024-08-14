import axios from "axios";
import {
	GET_USER_PROFILE_FAILURE,
	GET_USER_PROFILE_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS, UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_SUCCESS
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
			getUserProfile();
			window.location.replace("/home")
		} else if (data.status === 1) {
			dispatch({type:LOGIN_USER_FAILURE, payload: data.message});
		}

	} catch (error) {
		if (error.response && error.response.data) {
			const {data} = error.response;
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: data.message})
		} else {
			toast.error(error.message, {autoClose: 2000, position: "top-right"})
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: error.message})
		}
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
		if (error.response && error.response.data) {
			const {data} = error.response;
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: data.message})
		} else {
			toast.error(error.message, {autoClose: 2000, position: "top-right"})
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: error.message})
		}
	}
}

export const getUserProfile = () => async (dispatch) => {
	try {
		const {data} = await axios.get(baseUrl + '/user/my-profile', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			}
		});

		if (data.status === 0) {
			localStorage.setItem("user", JSON.stringify(data.data));
			dispatch({type:GET_USER_PROFILE_SUCCESS, payload: data.data});
			toast.info("Get user profile success", {autoClose: 2000, position: "top-right"});
		} else {
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
			dispatch({type:GET_USER_PROFILE_FAILURE, payload: data.message})
		}

	} catch (error) {
		if (error.response && error.response.data) {
			const {data} = error.response;
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: data.message})
		} else {
			toast.error(error.message, {autoClose: 2000, position: "top-right"})
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: error.message})
		}
	}
}

export const logout = () => async (dispatch) => {
	try {
		localStorage.clear()
		const jwt = localStorage.getItem('jwt')
		const {data} = await axios.post(baseUrl + '/user/logout', null, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			}
		});
		if (data.status === 0) {
			localStorage.clear()
			dispatch({type:LOGOUT_SUCCESS, payload: null})
			toast.success("Logout success", {autoClose: 2000, position: "top-right"});
		} else if (data.status === 1) {
			dispatch({type:LOGOUT_FAILURE, payload: null})
			toast.error("Logout failed", {autoClose: 2000, position: "top-right"});
		}

	} catch (error) {
		if (error.response && error.response.data) {
			const {data} = error.response;
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: data.message})
		} else {
			toast.error(error.message, {autoClose: 2000, position: "top-right"})
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: error.message})
		}
	}
}

export const editProfile = (dataUpdate) => async (dispatch) => {
	try {
		const jwt = localStorage.getItem('jwt')
		const {data} = await axios.post(baseUrl + '/user/update-info', dataUpdate, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			}
		});
		if (data.status === 0) {
			toast.success("Update information success", {autoClose: 2000, position: "top-right"});
		} else if (data.status === 1) {
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: data.message})
			toast.error("Update profile failed", {autoClose: 2000, position: "top-right"});
		}

	} catch (error) {
		if (error.response && error.response.data) {
			const {data} = error.response;
			toast.error(data.message, {autoClose: 2000, position: "top-right"});
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: data.message})
		} else {
			toast.error(error.message, {autoClose: 2000, position: "top-right"})
			dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload: error.message})
		}
	}
}