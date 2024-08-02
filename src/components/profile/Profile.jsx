import React, {useState} from 'react';
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
import {useSelector} from "react-redux";
import defaultAvatar from '../src/default-avatar.png';
import coverImage from '../src/cover-image.png';

const Profile = () => {
	const [tabValue, setTabValue] = useState("1");
	const {auth} = useSelector(store => store)
	const navigate = useNavigate();

	const handleBack = () => navigate(-1);

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
	return (
		<div>
			<section className='bg-white z-50 flex items-center sticky top-0 bg-opacity-95'>
				<KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}/>
				<h1 className='py-5 text-xl font-bold opacity-90 ml-5'>Profile</h1>
			</section>
			<section>
				<img className='w-[100%] h-[15rem] object-cover'
				     src={auth.user?.coverImage || coverImage}
				     alt="cover"/>
			</section>

			<section className='pl-6'>
				<div className='flex justify-between items-start mt-5 h-[5rem]'>
					<Avatar
						className='transform -translate-y-24'
						alt='avatar'
						src={auth.user?.avatar || defaultAvatar}
						sx={{width: "10rem", height: "10rem", border: "4px solid white"}}/>
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
						<h1 className='font-bold text-lg'>{auth.user?.firstName} {auth.user?.lastName}</h1>
					</div>
					<h1 className='text=gray-500'>{auth.user?.email}</h1>
				</div>
				<div className='mt-2 space-y-3'>
					<p>{auth.user?.blog}</p>
					{/*Follower - following*/}
					<div className='flex items-center space-x-5'>
						<div className='flex items-center space-x-1 font-semibold'>
							<span>{auth.user?.follower}</span>
							<span className='text-gray-500'> Follower</span>
						</div>
						<div className='flex items-center space-x-1 font-semibold'>
							<span>{auth.user?.following}</span>
							<span className='text-gray-500'> Following</span>
						</div>
					</div>
					{/*Info*/}
					{/*<div className='py-1 flex space-x-5'>*/}
					{/*	<div className='flex items-center text-gray-500'>*/}
					{/*		<LocationOnIcon/>*/}
					{/*		<p>{auth.user?.address}</p>*/}
					{/*	</div>*/}
					{/*</div>*/}
					{/*<div className='py-1 flex space-x-5'>*/}
					{/*	<div className='flex items-center text-gray-500'>*/}
					{/*		<LocalPhoneIcon/>*/}
					{/*		<p>{auth.user?.phoneNumber}</p>*/}
					{/*	</div>*/}
					{/*</div>*/}
					{/*<div className='py-1 flex space-x-5'>*/}
					{/*	<div className='flex items-center text-gray-500'>*/}
					{/*		<CakeIcon/>*/}
					{/*		<p>{formatDate(auth.user?.birth)}</p>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<table className='w-full border-collapse'>
						<tbody>
						{/* Render Address Row Only if Address Exists */}
						{auth.user?.address && (
							<tr>
								<td className='py-1 text-gray-500 px-4'>
									<LocationOnIcon style={{verticalAlign: 'middle'}}/>
									<span className='ml-2'>{auth.user.address}</span>
								</td>
							</tr>
						)}
						{/* Render Phone Number Row Only if Phone Number Exists */}
						{auth.user?.phoneNumber && (
							<tr>
								<td className='py-1 text-gray-500 px-4'>
									<LocalPhoneIcon style={{verticalAlign: 'middle'}}/>
									<span className='ml-2'>{auth.user.phoneNumber}</span>
								</td>
							</tr>
						)}
						{/* Render Birth Date Row Only if Birth Date Exists */}
						{auth.user?.birth && (
							<tr>
								<td className='py-1 text-gray-500 px-4'>
									<CakeIcon style={{verticalAlign: 'middle'}}/>
									<span className='ml-2'>{formatDate(auth.user.birth)}</span>
								</td>
							</tr>
						)}
						</tbody>
					</table>
					{/*<div className='py-1 flex space-x-5'>*/}
					{/*	<div className='flex items-center text-gray-500'>*/}
					{/*		<SchoolIcon/>*/}
					{/*		<p>Thang Long university</p>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<div className='py-1 flex space-x-5'>
						<div className='flex items-center text-gray-500'>
							<CalendarMonthIcon/>
							<p>{auth.user?.createdDate}</p>
						</div>
					</div>
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
							{[1, 1, 1, 1, 1].map((item) => <PostCard/>)}
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
