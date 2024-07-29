import React, {useState} from 'react';
import {Avatar, Button} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PostCard from "./PostCard";

const validationSchema = Yup.object().shape({
	content: Yup.string().required("Tweet text is required")
})

const HomeSection = () => {
	const [uploadingImage, setUploadingImage] = useState(false);
	const [selectedImage, setSelectedImage] = useState("");
	const handleSubmit = (values) => {
		console.log("values ", values)
	}

	const formik = useFormik({
		initialValues: {
			content: "",
			image: ""
		},
		onSubmit: handleSubmit,
		validationSchema,
	})

	const handleSelectImage = (event) => {
		setUploadingImage(true);
		const imgUrl = event.target.files[0];
		formik.setFieldValue("image", imgUrl);
		setSelectedImage(imgUrl)
		setUploadingImage(false);
	}
	return (
		<div className='space-y-5'>
			<section>
				<h1 className='py-5 text-xl font-bold opacity-90 '>Home</h1>
			</section>
			<section className='pb-10'>
				<div className='flex space-x-5'>
					<Avatar alt="username" src=""/>
					<div className='w-full'>
						<form onSubmit={formik.handleSubmit}>
							<div>
								{/*border-none: Loại bỏ viền mặc định của input.
									outline-none: Loại bỏ outline khi input được chọn.
									text-xl: Đặt kích thước văn bản lớn hơn bình thường.
									bg-transparent: Làm nền của input trong suốt.*/}
								{/*{...formik.getFieldProps("content")}: Liên kết input với Formik bằng cách
										sử dụng hàm getFieldProps, giúp lấy các thuộc tính cần thiết để Formik có thể
										quản lý trạng thái và xác thực của input.*/}
								<input type="text" name='content' placeholder='What is happening'
								       className='border-none outline-none text-xl bg-transparent'
								       {...formik.getFieldProps("content")}/>
								{/*{formik.errors.content && formik.touched.content && (: Kiểm tra nếu có lỗi
								(formik.errors.content) và input đã được chạm vào (formik.touched.content).
								<span className='text-red-500'>{formik.errors.content}</span>: Nếu có lỗi,
								hiển thị thông báo lỗi với màu đỏ (text-red-500).*/}
								{formik.errors.content && formik.touched.content && (
									<span className='text-red-500'>{formik.errors.content}</span>
								)}
							</div>
							<div>
								<img src="" alt=""/>
							</div>
							<div className='flex justify-between items-center mt-5'>
								<div className='flex space-x-5 items-center'>
									{/*rounded-md: Áp dụng bo góc trung bình cho phần tử.
									cursor-pointer: Đặt kiểu con trỏ chuột thành con trỏ tay chỉ (thường sử dụng cho các phần tử có thể nhấp được).*/}
									<label className='flex items-center space-x-2 rounded-md cursor-pointer'>
										<ImageIcon className='text-[#1d9bf0]'/>
										<input type="file" name="imageFile" className='hidden' onChange={handleSelectImage}/>
									</label>
									<FmdGoodIcon className='text-[#1d9bf0]'/>
									<TagFacesIcon className='text-[#1d9bf0]'/>
								</div>
								<div>

								</div>
								<div>
									<Button
										sx={{width: "100%", borderRadius: "20px", paddingY: "8px", paddingX:"20px"}}
										variant='contained'
										type="submit"
									>
										Tweet
									</Button>
								</div>

							</div>
						</form>

					</div>
				</div>
			</section>
			<section className=''>
				{[1,1,1,1,1].map((item) => <PostCard/>)}
			</section>
		</div>
	);
};

export default HomeSection;
