import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'

const LoginAdmin = () => {
	const cookie = new Cookies()
	const email = useRef(null)
	const password = useRef(null)
	const [err,setErr] = useState(null)
	const navigate = useNavigate()
	const handleForm = (e) => {
		e.preventDefault()
		if(email.current.value === '' ){
			return setErr("Email id cannot empty !")
		}else if(password.current.value === ''){
			return setErr("Password cannot be empty !")
		}
		axios.post('/admin/login',{
			email : email.current.value,
			password : password.current.value
		}).then(({data}) => {
			if(data.status === "success"){
				cookie.set('admin_token',data?.token,{path : '/'})
				navigate('/admin/dashboard')
			}else{
				setErr("invalid credentials ! ")
			}
		})
		.catch(() => {
			setErr("invalid credentials ! ")
		})
	}
	useEffect(() => {
		if (!cookie.get('admin_token')) {
			return navigate("/admin/login");
		}else{
			return navigate('/admin/dashboard')
		}
	},[])
	return (
		<div>
			<section class="bg-gray-50 dark:bg-gray-900">
				<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a
						href="go"
						class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
						<img class=" h-8 mr-4" src="/logo.png" alt="logo" />
						<span className="text-primary text-2xl font-medium">CodeLab</span>
					</a>
					<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to Admin Panel
							</h1>
							<form
								class="space-y-4 md:space-y-6"
								onSubmit={handleForm}>
								<div>
									<label
										for="email"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Your email
									</label>
									<input
										type="email"
										ref={email}
										class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500-600 focus:border-blue-500-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required=""
									/>
								</div>
								<div>
									<label
										for="password"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Password
									</label>
									<input
										type="password"
										ref={password}
										placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500-600 focus:border-blue-500-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>

								<span class="text-sm text-red-500">{err}</span>

								<button
									type="submit"
									class="w-full text-white bg-blue-500 hover:bg-blue-500-700 focus:ring-4 focus:outline-none focus:ring-blue-500-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500-600 dark:hover:bg-blue-500-700 dark:focus:ring-blue-500-800">
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LoginAdmin;
