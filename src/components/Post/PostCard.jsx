import React, {useState} from 'react';
import {Avatar, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentModal from "../homeSection/CommentModal";
import defaultAvatar from '../src/default-avatar.png';
import axios from "axios";
import {toast} from "react-toastify";

const PostCard = ({post}) => {
	const navigate = useNavigate();
	const [liked, setLiked] = useState(post.liked);
	const [openCommentModal, setOpenCommentModal] = useState(false);
	const handleOpenCommentModel = () => setOpenCommentModal(true);
	const handleCloseCommentModal = () => setOpenCommentModal(false);

	const [anchorEl, setAnchorEl] = React.useState(false);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// const timeAgo = moment(post?.createdDate).fromNow();
	const handleDeletePost = async (id) => {
		try {
			const jwt = localStorage.getItem('jwt')
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/post/delete`, {
				"id": id
			},{
				headers: {
					Authorization: `Bearer ${jwt}`,
				}
			});
			toast.success(response.data.message)
		} catch (error) {
			toast.error("Failed to delete post");
		}
		handleClose();
	}

	const handleReportPost = () => {
		console.log("Report post");
		handleClose();
	}

	const handlePostDetail = () => {
		navigate(`/post/${post.id}`, {state: {post}});
	};

	const handleLikePost = async (id) => {
		try {
			if (liked) {
				post.like = post.like - 1;
			} else {
				post.like = post.like + 1;
			}
			setLiked(!liked);
			const jwt = localStorage.getItem('jwt')
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/post/like`, {
				"id": id
			}, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				}
			});

			const response2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/${id}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				}
			});
			post = response2.data.data;
		} catch (error) {
			toast.error("Failed to like post")
		}

	}

	const handleCreateComment = () => {
		console.log("Comment")
	}
	return (
		<React.Fragment>
			{/*<div className='flex items-center font-semibold text-gray-700 py-2'>*/}
			{/*	<RepeatIcon/>*/}
			{/*	<p>Your post</p>*/}
			{/*</div>*/}

			<div className='flex space-x-5 shadow bg-white mt-3'
			     style={{padding: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px'}}
			>
				<Avatar
					className='cursor-pointer'
					alt={post?.createdBy}
					src={post?.avatar ? `${process.env.REACT_APP_BASE_URL_PHOTO}${post?.avatar}` : defaultAvatar}
					onClick={() => navigate(`/profile/${post?.createdBy}`)}
				/>
				<div className='w-full'>
					<div className='flex justify-between items-center'>
						<div className='flex cursor-pointer items-center space-x-2'>
							<span className='font-semibold'>{post?.createdBy}</span>
							<span className='text-gray-600'>{new Date(post?.createdDate).toLocaleString()}</span>
							{/*<img className='ml-2 w-5 h-5' src="../../logo.svg" alt="user"/>*/}
						</div>
						<div>
							<Button
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								<MoreHorizIcon/>
							</Button>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem onClick={() => handleDeletePost(post?.id)}>Delete</MenuItem>
								<MenuItem onClick={handleReportPost}>Edit</MenuItem>
							</Menu>
						</div>
					</div>
					<div className='mt-2'>
						<div onClick={() => navigate(`/post/${post.id}`)} className='cursor-pointer'>
							<p className='mb-2 p-0'>{post.content}</p>
							{post.media.length > 0 && (
								post.media.map((mediaId, index) => (
									<img
										key={index}
										className='w-[28rem] border border-gray-400 p-5 rounded-md'
										src={`${process.env.REACT_APP_BASE_URL_PHOTO}${mediaId}`}
										alt={`Post Media ${index}`}
									/>
								))
							)}
						</div>
						<div className='py-5 flex flex-wrap justify-items-start items-center space-x-10'>
							<div
								className={`${liked ? "text-pink-600" : "text-gray-600"} space-x-1 flex items-center`}>
								{liked ?
									<FavoriteIcon
										onClick={() => {
											console.log(liked)
											handleLikePost(post.id)
										}}
										className='cursor-pointer'
									/>
									:
									<FavoriteBorderIcon
										onClick={() => {
											console.log(liked)
											handleLikePost(post.id)
										}}
										className='cursor-pointer'
									/>
								}
								<p>{post.like}</p>
							</div>
							<div className='space-x-1 flex items-center text-gray-600'>
								<ChatBubbleOutlineIcon className='cursor-pointer' onClick={handleOpenCommentModel}/>
								<p>{post.comment}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section>
				<CommentModal open={openCommentModal} handleClose={handleCloseCommentModal} postId={post.id} />
			</section>
		</React.Fragment>
	);
};

export default PostCard;
