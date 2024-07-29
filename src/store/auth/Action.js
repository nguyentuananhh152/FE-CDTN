import axios from "axios";
import {
	GET_USER_PROFILE_FAILURE,
	GET_USER_PROFILE_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS
} from "./ActionType";
const baseUrl = process.env.BASE_URL;

export const loginUser = (loginData) => async (dispatch) => {
	try {
		const {data} = await axios.post(baseUrl + 'auth/login', loginData);

		if (data.status === 0) {
			localStorage.setItem("jwt", data.data.access_token);
			dispatch({type:LOGIN_USER_SUCCESS, payload: data.data.access_token});
		} else {
			dispatch({type:LOGIN_USER_FAILURE, payload: data.message})
		}

	} catch (error) {
		console.log("error", error)
		dispatch({type:LOGIN_USER_FAILURE, payload: error.message})
	}
}

export const registerUser = (registerData) => async (dispatch) => {
	try {
		const {data} = await axios.post(baseUrl + 'auth/register', registerData);

		if (data.status === 0) {
			localStorage.setItem("jwt", data.data.access_token);
			dispatch({type:REGISTER_USER_SUCCESS, payload: data.data.access_token});
		} else {
			dispatch({type:REGISTER_USER_FAILURE, payload: data.message})
		}

	} catch (error) {
		console.log("error", error)
		dispatch({type:REGISTER_USER_FAILURE, payload: error.message})
	}
}

export const getUserProfile = (registerData) => async (dispatch) => {
	try {
		const {data} = await axios.get(baseUrl + '/user/profile', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`,
			}
		});

		if (data.status === 0) {
			dispatch({type:GET_USER_PROFILE_SUCCESS, payload: data.data});
		} else {
			dispatch({type:GET_USER_PROFILE_FAILURE, payload: data.message})
		}

	} catch (error) {
		console.log("error", error)
		dispatch({type:GET_USER_PROFILE_FAILURE, payload: error.message})
	}
}