import React, {useState} from 'react';
import {
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid, Link,
	TextField,
	Typography
} from "@mui/material";
import Logo from "../src/Logo";
import {useFormik} from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required")
})

const Authentication = () => {

	const handleSubmit = (values) => {
		console.log("Sign in: ", values)
	}

	const[notification, setNoti] = useState('')
	const formik = useFormik({
		initialValues:{
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: handleSubmit
	})

	const forgot = () => {
		setNoti("Functionality is under development (chức năng đang được phát triển)")
	}
	const signup = () => {
		window.location.replace('/signup')
	}
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Logo/>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form"
				     onSubmit={formik.handleSubmit}
				     noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoFocus
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<p style={{color:"red"}}>{notification}</p>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2" onClick={forgot}>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2" onClick={signup}>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);


};

export default Authentication;
