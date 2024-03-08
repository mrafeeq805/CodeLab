import React, { useEffect, useRef, useState } from "react";
import LoginIntro from "./LoginIntro";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ForgotPassword = () => {
	const [cookie, removeCookie,setCookie] = useCookies([]);
	const email = useRef(null);
    const otp = useRef(null)
	const [forgotError, setForgotError] = useState(null);
	const [otpSent, setOtpSent] = useState(false);
	const navigate = useNavigate();

	const handleSendOtp = (e) => {
		e.preventDefault();
		const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
			email.current.value
		);
		if (email.current.value === "" || !regex) {
			return setForgotError("Enter a valid email id !");
		} else {
			setForgotError(null);
			axios
				.post("/sendotp", { email: email.current.value })
				.then(({ data }) => {
					if (data?.result === "email sent") {
						setOtpSent(true);
					} else {
						setOtpSent(false);
						setForgotError(data?.result);
					}
				})
				.catch((err) => {
					setForgotError(err);
				});
		}
	};
    const handleVerify = (e) => {
		e.preventDefault();
		if (otp.current.value === "") {
			return setForgotError("Enter a valid otp !");
		} else {
			setForgotError(null);
			axios
				.post("/verifyotp", { otp: otp.current.value })
				.then(({ data }) => {
					if (data?.result === "verified") {
						navigate('/setpassword')
					} else {
						setForgotError(data?.result);
					}
				})
				.catch((err) => {
					setForgotError(err);
				});
		}
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
				title={"Forgot Password"}
				info={"Enter your regigstered Email ID  to continue"}
			/>
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
					{otpSent && (<div>
						<label className="text-login font-medium ">OTP</label>
						<div className=" border-2 rounded-lg flex justify-between p-2 my-3">
							<input ref={otp} className="w-full text-login_light outline-none" type="text" />
							
						</div>
					</div>)}

					<button className="bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
						Continue
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
