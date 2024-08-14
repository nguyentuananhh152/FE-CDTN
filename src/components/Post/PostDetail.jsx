import React, {useEffect, useState} from 'react';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import PostCard from "./PostCard";
import {Divider} from "@mui/material";
import axios from "axios";

const PostDetail = () => {
	const navigate = useNavigate();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const { id } = useParams();
	const handleBack = () => navigate(-1);
	console.log("Post id: ", id)

	useEffect(() => {
		const fetchPost = async () => {
			try {
				console.log(id)
				const jwt = localStorage.getItem('jwt');
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/get/${id}`, {
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				});
				setPost(response.data.data);
				setComments(response.data.data.comments);
				console.log(response.data.data);
			} catch (error) {
				console.error("Failed to fetch post:", error);
			}
		};

		fetchPost();
	}, [id]);

	return (
		<React.Fragment>
			{/**/}
			<section className='z-50 flex items-center sticky bg-opacity-95'>
				<KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}/>
				<h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Post Detail</h1>
			</section>

			{/*	*/}
			<section>
				{post ? <PostCard post={post}/> : <></>}
				<Divider sx={{margin: "2rem 0rem", }}/>
			</section>

			{/*List comment*/}
			{/*<section className='space-y-2'>*/}
			{/*	{[1,1,1,1].map((item) => <PostCard/>)}*/}
			{/*</section>*/}
		</React.Fragment>
	);
};

export default PostDetail;
