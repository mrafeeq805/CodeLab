import React, { useEffect, useRef, useState } from "react";
import LoginIntro from "./LoginIntro";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import { useCookies } from "react-cookie";



const Login = () => {
	const cookies = new Cookies();
	const [cookie, removeCookie,setCookie] = useCookies([]);
	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState(null);
	const [passwordValue, setPasswordValue] = useState(true);
	const navigate = useNavigate();
	const email = useRef(null);
	const password = useRef(null);
	const handlerSignup = () => {
		navigate("/signup");
	};
	const handlerForgot = () => {
		navigate("/forgotpassword");
	};
	const togglePassword = () => {
		setPasswordValue(!passwordValue);
	};
	const formHandler = async (e) => {
		e.preventDefault();
		if (email.current.value === "") {
			return setLoginError("Enter valid email id !");
		}
		if (password.current.value === "") {
			return setLoginError("Enter valid password !");
		}

		const formData = {
			email: email.current.value,
			password: password.current.value,
		};
		await axios.post("/login", formData).then((r) => {
			if (r.data.result === "success") {
				cookies.set('token', r?.data?.token, { path: '/' });
				console.log(cookies.token);
				navigate("/");
			} else {
				setLoginError(r.data.result);
			}
		})
		.catch((err) => {
			setLoginError(err);
		})
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
		<div>
			<LoginIntro
				title={"User Signin"}
				info={"Please fill your detail to access your account."}
			/>
			<div className="mt-4 px-4">
				<form className="" onSubmit={formHandler}>
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
							onClick={togglePassword}
							class={
								passwordValue
									? "bi bi-eye-slash text-login_light text-lg"
									: "bi bi-eye text-login_light text-lg"
							}></i>
					</div>
					<span onClick={handlerForgot} className="text-primary font-medium">
						Forgot Password ?
					</span>
					{loginError && (
						<span className="text-red-500 text-xs">{loginError}</span>
					)}
					<button className="bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
						Signin
					</button>
					<div className="flex justify-center py-5">
						<span className="text-login_light text-">
							Don’t have an account ?{" "}
							<span
								onClick={handlerSignup}
								className="text-primary font-medium">
								Signup
							</span>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
