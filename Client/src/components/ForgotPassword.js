import React, { useEffect, useRef, useState } from "react";
import LoginIntro from "./LoginIntro";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import FormLoading from "./skelton/FormLoading";

const ForgotPassword = () => {
	const [cookie, removeCookie, setCookie] = useCookies([]);
	const email = useRef(null);
	const otp = useRef(null);
	const [forgotError, setForgotError] = useState(null);
	const [otpSent, setOtpSent] = useState(false);
	const navigate = useNavigate();
	const [submitted, setSubmitted] = useState(false);

	const handleSendOtp = (e) => {
		e.preventDefault();
		const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
			email.current.value
		);
		if (email.current.value === "" || !regex) {
			return setForgotError("Enter a valid email id !");
		} else {
			setForgotError(null);
			setSubmitted(true);
			axios
				.post("/api/sendotp", { email: email.current.value })
				.then(({ data }) => {
					if (data?.result === "email sent") {
						setSubmitted(false);
						setOtpSent(true);
					} else {
						setSubmitted(false);
						setOtpSent(false);
						setForgotError(data?.result);
					}
				})
				.catch((err) => {
					setSubmitted(false);
					setForgotError(err);
				});
		}
	};
	const handleVerify = (e) => {
		e.preventDefault();
		if (otp.current.value === "") {
			return setForgotError("Enter a valid otp !");
		} else {
			setSubmitted(true);
			setForgotError(null);
			axios
				.post("/api/verifyotp", { otp: otp.current.value })
				.then(({ data }) => {
					if (data?.result === "verified") {
						setSubmitted(false);
						navigate("/setpassword");
					} else {
						setSubmitted(false);
						setForgotError(data?.result);
					}
				})
				.catch((err) => {
					setSubmitted(false);
					setForgotError(err);
				});
		}
	};
	useEffect(() => {
		const isAuth = cookie.token;
		console.log(cookie.token);
		//const isAuth = localStorage.getItem('user');
		if (isAuth && isAuth !== "undefined") {
			navigate("/");
		}
	}, []);
	return (
		<div className="relative sm:flex sm:items-center md:justify-center md:px-56 md:pt-16">
			<div className="hidden sm:w-1/2 md:w-2/5 sm:flex sm:justify-center sm:items-center">
				<img className="w-full" src="/img/login.avif" alt="login" />
			</div>
			<div className="md:w-5/12">
				<LoginIntro
					title={"Forget Password"}
					info={"Enter your registered Email ID  to continue"}
				/>
				{submitted && <FormLoading />}
				<div className="mt-4 px-4">
					<form className="" onSubmit={otpSent ? handleVerify : handleSendOtp}>
						<label className="text-login font-medium ">Email</label>
						<div className="border-2 rounded-lg flex justify-between p-2 my-3">
							<input
								readOnly={otpSent}
								ref={email}
								className="w-full text-login_light outline-none"
								type="text"
							/>
						</div>
						{forgotError && (
							<span className="text-red-500 text-xs">{forgotError}</span>
						)}
						{otpSent && (
							<div>
								<label className="text-login font-medium ">OTP</label>
								<div className=" border-2 rounded-lg flex justify-between p-2 my-3">
									<input
										ref={otp}
										className="w-full text-login_light outline-none"
										type="text"
									/>
								</div>
							</div>
						)}

						<button className="bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
							Continue
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
