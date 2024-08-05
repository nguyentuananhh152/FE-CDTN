import axios from "axios";
import {registerUser} from "../store/auth/Action";


const baseURL = process.env.REACT_APP_BACKEND_URL;
export const api = axios.create({
	baseURL: baseURL,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("jwt")}`,
		"Content-Type": "application/json",
	}
})

export const formatDate = (date) => {
	if (!date) return '';
	const year = date.getFullYear();
	const day = date.getDate().toString().padStart(2, '0'); // Đảm bảo ngày luôn có 2 chữ số
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng từ 1-12, phải cộng 1 và đảm bảo có 2 chữ số
	return `${year}-${day}-${month}`;
};
