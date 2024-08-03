import {api} from "../../config/config";
import {GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST} from "./ActionType";


const getAllPosts = () => async (dispatch) => {
	try {
		const {data} = await api.get("/post/my-post");
		console.log("Get all posts", data.data);
		dispatch({type: GET_ALL_POST_REQUEST, payload: data.data});
	} catch (error) {
		console.log(error);
		dispatch({type: GET_ALL_POST_FAILURE, payload: error.message});
	}
}