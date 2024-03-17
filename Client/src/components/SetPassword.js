import React, { useRef, useState } from "react";
import LoginIntro from "./LoginIntro";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormLoading from "./skelton/FormLoading";

const SetPassword = () => {
    const navigate = useNavigate()
	const [passwordValue, setPasswordValue] = useState(true);
    const password = useRef(null)
    const confirm = useRef(null)
	const [submitted,setSubmitted] = useState(false)
    const [passwordError,setPasswordError] = useState(null)
	const togglePassword = () => {
		setPasswordValue(!passwordValue);
	};
    const handleForm = (e) => {
        e.preventDefault()
        if(password.current.value === '' || confirm.current.value === ''){
            return setPasswordError('Password cannot be empty !')
        }else if(password.current.value !== confirm.current.value){
            return setPasswordError('Both passwords should be same !')
        }
		setSubmitted(true)
        axios.post('/setpassword',{password : confirm.current.value})
        .then(({data}) => {
            if(data?.result === 'updated'){
				setSubmitted(false)
                navigate('/login')
                console.log('password successfully changed');
            }else{
				setSubmitted(false)
                setPasswordError(data?.result)
            }
        })

        
    }
	return (
		<div>
			<LoginIntro
				title={"Set Password"}
				info={"Enter New Password for your account"}
			/>
			{submitted && <FormLoading/>}
			<div className="mt-4 px-4">
				<form className="" onSubmit={handleForm}>
					<label className="text-login font-medium ">New Password</label>
					<div className="border-2 rounded-lg flex justify-between p-2 my-3">
						<input ref={password} className="w-full text-login_light outline-none" type="password" />
					</div>
					<label className="text-login font-medium">Confirm Password</label>
					<div className="border-2 rounded-lg flex justify-between p-2 my-3">
						<input
							className="w-full text-login_light outline-none"
							type={passwordValue ? "password" : "text"}
							ref={confirm}
						/>
						<i
							onClick={togglePassword}
							class={
								passwordValue
									? "bi bi-eye-slash text-login_light text-lg"
									: "bi bi-eye text-login_light text-lg"
							}></i>
					</div>
                    {passwordError && (
						<span className="text-red-500 text-xs">{passwordError}</span>
					)}
					<button className="bg-primary p-2 w-full rounded-lg text-xl text-white py-3 mt-5">
						Save Password
					</button>
				</form>
			</div>
		</div>
	);
};

export default SetPassword;
