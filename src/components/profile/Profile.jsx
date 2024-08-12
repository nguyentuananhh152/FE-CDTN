import React, {useEffect, useState} from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Tab} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PostCard from "../Post/PostCard";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import ProfileModal from "./ProfileModal";
import defaultAvatar from '../src/default-avatar.png';
import coverImage from '../src/cover-image.png';
import axios from "axios";
import {toast} from "react-toastify";

const Profile = () => {
	const [tabValue, setTabValue] = useState("1");
	const user = JSON.parse(localStorage.getItem("user"));
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const handleBack = () => navigate("/home");

	const [openProfileModal, setOpenProfileModal] = useState(false);
	const handleOpenProfileModel = () => setOpenProfileModal(true);
	const handleClose = () => setOpenProfileModal(false);

	const handleFollowUser = () => {
		console.log("Follow user")
	}

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	}

	const formatDate = (d) => {
		const date = new Date(d);
		const year = date.getFullYear();
		const day = date.getDate().toString().padStart(2, '0'); // Đảm bảo ngày luôn có 2 chữ số
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng từ 1-12, phải cộng 1 và đảm bảo có 2 chữ số
		return `${day}-${month}-${year}`;
	};

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const jwt = localStorage.getItem('jwt')
				console.log(jwt)
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/my-posts`, {
					headers: {
						Authorization: `Bearer ${jwt}`,
					}
				});
				setPosts(response.data.data);
			} catch (error) {
				toast.error("Failed to get my post");
			}
		};

		fetchPosts();
	}, []);

	return (
		<div>
			<section className='z-50 flex items-center sticky bg-opacity-95'>
				<KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}/>
				<h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Profile</h1>
			</section>
			<section>
				<img className='w-[100%] h-[15rem] object-cover shadow-2xl'
				     src={user?.coverImage ? `${process.env.REACT_APP_BASE_URL_PHOTO}${user.coverImage}` : coverImage}
				     alt="cover image"/>
			</section>

			<section className='pl-6'>
				<div className='flex justify-between items-start mt-5 h-[5rem] bg`'>
					<Avatar
						className='transform -translate-y-24 bg-white'
						alt='avatar'
						src={user?.avatar ? `${process.env.REACT_APP_BASE_URL_PHOTO}${user.avatar}` : defaultAvatar}
						onClick={() => console.log(`${process.env.REACT_APP_BASE_URL_PHOTO}${user.avatar}`)}
						sx={{width: "10rem", height: "10rem", border: "4px solid #60A5FA"}}/>
					{true ? (
						<Button
							onClick={handleOpenProfileModel}
							variant='contained' sx={{borderRadius: "20px"}}>Edit</Button>
					) : (
						<Button
							onClick={handleFollowUser}
							variant='contained' sx={{borderRadius: "20px"}}>
							{true ? "Follow" : "Unfollow"}
						</Button>
					)}
				</div>

				<div>
					<div className='flex items-center'>
						<h1 className='font-bold text-lg'
						    style={{fontSize: '40px'}}>{user?.firstName} {user?.lastName}</h1>
					</div>
					<h1 className='text=gray-500'>{user?.email}</h1>
				</div>
				<div className='mt-2 space-y-3'>
					<p>{user?.blog}</p>
					{/*Follower - following*/}
					<div className='flex items-center space-x-5'>
						<div className='flex items-center space-x-1 font-semibold'>
							<span>{user?.follower}</span>
							<span className='text-gray-500'> Follower</span>
						</div>
						<div className='flex items-center space-x-1 font-semibold'>
							<span>{user?.following}</span>
							<span className='text-gray-500'> Following</span>
						</div>
					</div>
					<table className='w-full border-collapse'>
						<tbody>
						{/* Render Address Row Only if Address Exists */}
						{user?.address && (
							<tr>
								<td className='py-1 text-gray-500'>
									<LocationOnIcon style={{verticalAlign: 'middle'}}/>
									<span className='ml-2'>{user.address}</span>
								</td>
							</tr>
						)}
						{/* Render Phone Number Row Only if Phone Number Exists */}
						{user?.phoneNumber && (
							<tr>
								<td className='py-1 text-gray-500'>
									<LocalPhoneIcon style={{verticalAlign: 'middle'}}/>
									<span className='ml-2'>{user.phoneNumber}</span>
								</td>
							</tr>
						)}
						{/* Render Birth Date Row Only if Birth Date Exists */}
						{user?.birth && (
							<tr>
								<td className='py-1 text-gray-500'>
									<CakeIcon style={{verticalAlign: 'middle'}}/>
									<span className='ml-2'>{formatDate(user.birth)}</span>
								</td>
							</tr>
						)}
						{user?.createdDate && (
							<tr>
								<td className='py-1 text-gray-500'>
									<CalendarMonthIcon style={{verticalAlign: 'middle'}}/>
									<span className='ml-2'>Joined at {formatDate(user.createdDate)}</span>
								</td>
							</tr>
						)}
						</tbody>
					</table>

				</div>
			</section>
			{/*List post*/}
			<section className='py-5'>
				<Box sx={{width: '100%', typography: "body1"}}>
					<TabContext value={tabValue}>
						<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
							<TabList onChange={handleTabChange} aria-label='lab API tabs example'>
								<Tab label="Posts" value="1"/>
								<Tab label="Media" value="2"/>
							</TabList>
						</Box>
						<TabPanel value="1">
							<section className='space-y-2'>
								{posts.map((post) => (
									<PostCard key={post.id} post={post}/>
								))}
							</section>
						</TabPanel>
						<TabPanel value="2">
							Media
						</TabPanel>
					</TabContext>
				</Box>
			</section>

			<section>
				<ProfileModal handleClose={handleClose} open={openProfileModal}/>
			</section>
		</div>
);
};

export default Profile;
