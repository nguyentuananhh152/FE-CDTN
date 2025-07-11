import React, {useEffect, useState} from 'react';
import {Avatar, Button} from "@mui/material";
import {useFormik} from "formik";
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PostCard from "../Post/PostCard";
import "react-toastify/dist/ReactToastify.css";
import defaultAvatar from '../src/default-avatar.png';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import coverImage from "../src/cover-image.png";
import { useTranslation } from 'react-i18next';
import '../../i18n';

const HomeSection = () => {
	// const {auth} = useSelector(store => store)
	// const dispatch = useDispatch();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("user"));
	const [posts, setPosts] = useState([]);
	const [imagePreview, selectImagePreview] = useState(null);
	const [uploadingImage, setUploadingImage] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const handleSubmit = async (values) => {
		const formData = new FormData();
		formData.append("content", values.content.trim());

		// Thêm từng file vào formData
		if (values.image.length > 0) {
			values.image.forEach((file) => {
				formData.append("image", file);
			});
		} else {
			// Thêm một mảng rỗng vào formData nếu không có hình ảnh
			formData.append("image", []);
		}
		console.log(values)
		try {
			const jwt = localStorage.getItem('jwt')
			const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/post/create`, formData, {
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "multipart/form-data",
				},
			});
			formik.resetForm();
			setSelectedImage(null);
			selectImagePreview(null);
			window.location.reload();
		} catch (error) {
			console.error("Error creating post", error);
		}
	}
	const formik = useFormik({
		initialValues: {
			content: "",
			image: []
		},
		onSubmit: handleSubmit,
	})

	const handleAvatarClick = () => {
		// window.location.replace(`/profile/${auth.user?.email}`);
	};

	const handleSelectImage = (event) => {
		setUploadingImage(true);
		// const imgUrl = event.target.files[0];
		// formik.setFieldValue("image", imgUrl);
		// setSelectedImage(imgUrl)
		const files = Array.from(event.target.files); // chuyển thành mảng
		formik.setFieldValue("image", files); // lưu các file vào Formik
		setSelectedImage(URL.createObjectURL(files[0])); // chỉ hiển thị hình ảnh đầu tiên
		setUploadingImage(false);

		if (files) {
			const previewUrl = URL.createObjectURL(files[0]);
			selectImagePreview(previewUrl);
		}
	}

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const jwt = localStorage.getItem('jwt')
				const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/post/news-feed`, {
					headers: {
						Authorization: `Bearer ${jwt}`,
					}
				});
				setPosts(response.data.data);
			} catch (error) {
				toast.error("Failed to get news feed");
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className='space-y-5'>
			<section>
				<h1 className='py-5 text-xl font-bold opacity-90'>{t('Home')}</h1>
			</section>
			{/*pb-10: padding bottom*/}
			<section className='pb-10 shadow-xl border-2 p-3 rounded-xl bg-white'>
				<div className='flex space-x-5'>
					<Avatar
						src={user?.avatar ? `${process.env.REACT_APP_BASE_URL_PHOTO}${user.avatar}` : defaultAvatar}
						onClick={() => navigate(`/profile/${user?.email}`)}
					/>
					<div className='w-full'>
						<form onSubmit={formik.handleSubmit}>
							<div className='rounded-xl pl-2 bg-gray-200'>
								<input type="text" name='content' placeholder={t('What is happening')}
								       className='border-none outline-none text-xl bg-transparent '
								       {...formik.getFieldProps("content")}/>
							</div>
							<div>
								<img src="" alt=""/>
							</div>
							<div className='flex justify-between items-center mt-5'>
								<div className='flex space-x-5 items-center'>
									<label className='flex items-center space-x-2 rounded-md cursor-pointer'>
										<ImageIcon className='text-[#1d9bf0]'/>
										<input type="file" accept="image/*" name="imageFile" className='hidden'
										       onChange={handleSelectImage}/>

									</label>
									<TagFacesIcon className='text-[#1d9bf0]'/>
								</div>
								<div>

								</div>
								<div>
									<Button
										sx={{width: "100%", borderRadius: "30px", paddingY: "8px", paddingX: "20px"}}
										variant='contained'
										type="submit"
									>
										{t('post')}
									</Button>
								</div>
							</div>
							<div>
								{imagePreview ? <img className='w-full h-[12rem] object-cover object-center'
								                     src={imagePreview}
								                     alt="cover image"/> : <></>}
							</div>
						</form>

					</div>
				</div>
			</section>
			<section className='space-y-2'>
				{posts
					.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)) // Sắp xếp theo thời gian
					.map((post) => (
						<PostCard key={post.id} post={post}/>
					))}
			</section>
		</div>
	);
};

export default HomeSection;
