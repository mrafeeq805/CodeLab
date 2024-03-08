import React, { useEffect, useRef, useState } from "react";
import LoginIntro from "./LoginIntro";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import { useCookies } from "react-cookie";
import FormLoading from "./skelton/FormLoading";

const Signup = () => {
	const cookies = new Cookies();
	const [cookie, removeCookie,setCookie] = useCookies([]);
	const [signupError, setSignupError] = useState(null);
	const [passwordValue, setPasswordValue] = useState(true);
	const [submitted,setSubmitted] = useState(false)
	const dispatch = useDispatch();
	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const navigate = useNavigate();
	const handlerLogin = () => {
		navigate("/login");
	};
	const togglePassword = () => {
		setPasswordValue(!passwordValue);
	};
	const onHandleForm = async (e) => {
		e.preventDefault();
		if (name.current.value === "") {
			return setSignupError("Enter a valid name !");
		}
		if (email.current.value === "") {
			return setSignupError("Enter a email id !");
		}
		if (password.current.value === "") {
			return setSignupError("Enter a password !");
		}
		setSubmitted(true)
		const formData = {
			name: name.current.value,
			email: email.current.value,
			password: password.current.value,
		};
		await axios
			.post("/createaccount", formData)
			.then((r) => {
				if (r.data.result === "success") {
					cookies.set('token', r?.data?.token, { path: '/' });
					navigate("/");
					setSubmitted(false)
				} else {
					setSignupError(r.data.result);
					setSubmitted(false)
				}
			})
			.catch((err) => {
				setSignupError(err);
				setSubmitted(false)
			});
	};
	useEffect(() => {
        const isAuth = cookie.token
		console.log(cookie.token);
		//const isAuth = localStorage.getItem('user');
        if(isAuth && isAuth !== "undefined") {
            navigate("/");
        }
    }, []);
	return (
		<div className="relative">
			<LoginIntro
				title={"User Signup"}
				info={"Please fill your detail to create your account."}
			/>
			{submitted && <FormLoading/>}
			<div className="mt-4 px-4">
				<form className="" onSubmit={onHandleForm}>
					<label className="text-login font-medium">Full Name</label>
					<div className="border-2 rounded-lg flex justify-between p-2 my-3">
						<input
							className="w-full text-login_light outline-none"
							type="text"
							ref={name}
						/>
					</div>
					<label className="text-login font-medium ">Email</label>
					<div className="border-2 rounded-lg flex justify-between p-2 my-3">
						<input
							className="w-full text-login_light outline-none"
							type="text"
							ref={email}
						/>
					</div>
					<label className="text-login font-medium">Password</label>
					<div className="border-2 rounded-lg flex justify-between p-2 my-3">
						<input
							className="w-full text-login_light outline-none"
							type={passwordValue ? "password" : "text"}
							ref={password}
						/>
						<i
							className={
								passwordValue
									? "bi bi-eye-slash text-login_light text-lg"
									: "bi bi-eye text-login_light text-lg"
							}
							onClick={togglePassword}></i>
					</div>
					<button className="bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
						Signup
					</button>
					{signupError && (
						<span className="text-red-500 text-xs">{signupError}</span>
					)}
					<div className="flex justify-center py-5">
						<span className="text-login_light text-">
							Already have an account ?{" "}
							<span onClick={handlerLogin} className="text-primary font-medium">
								Log in
							</span>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
