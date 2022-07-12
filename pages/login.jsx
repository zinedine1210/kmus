import { useRouter } from "next/router";
import { useState } from "react"
import {G} from "../global/global.min.js"
import AuthRepository from "../repositories/AuthRepository.js";
import Swal from "sweetalert2";

export default function Login() {
	const [data, setData] = useState(null)
	const Router = useRouter()

	const handlerSubmit = e => {
		e.preventDefault()
		console.log(data.username, data.password);
		// if(this.state.submitLogin == false){
			let uus = G().enc(JSON.stringify({
				'user': data.username,
				'pass': data.password
			}), 2, 6)

			const pwd = G().rndStr(uus.length, 1, 6).substring(0, uus.length).replace(/\W/g, "")

			let payload = {
				'us': uus,
				'pass': pwd
			}

			// this.setState({errorLogin:true})

			AuthRepository.postLogin({"uspw":JSON.stringify(payload)})
			.then(responseData =>{
				// console.log(responseData);
				if(responseData.data.token){
					// this.setState({errorLogin:false})
					localStorage.setItem("xa", responseData.data.token);
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Kamu berhasil login',
						showConfirmButton: false,
						timer: 3000
					})
					console.log("sukses login")
					Router.push('/user');
				} else {
					console.log("Email atau Kata Sandi Salah")
					// this.handleNotification("error", "Email atau Kata Sandi salah!")
				}
			})
		// }
	};

	const handlerChange = (value, target) => {

		if(data){
			let obj = {
				[target]:value
			}

			setData(Object.assign(data, obj))
		}else{
			let obj = {
				[target]:value
			}
			setData(obj)
		}
		console.log(data);

	}

  return (
    <section className="h-screen max-h-screen flex items-center justify-center bg-slate-100">
		<div class="bg-white shadow rounded-lg md:mt-0 w-full sm:max-w-screen-sm xl:p-0">
			<div class="p-6 sm:p-8 lg:p-16 space-y-8">
				<h2 class="text-2xl lg:text-3xl font-bold text-gray-900">
					MASUK
				</h2>
				<form class="mt-8 space-y-6" onSubmit={(e) => handlerSubmit(e)}>
					<div>
						<label for="email" class="text-sm font-medium text-gray-900 block mb-2">Username</label>
						<input type="text" name="username" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Masukkan username anda" required onChange={(e) => handlerChange(e.target.value, e.target.name)}/>
					</div>
					<div>
						<label for="password" class="text-sm font-medium text-gray-900 block mb-2">Password</label>
						<input type="password" onChange={(e) => handlerChange(e.target.value, e.target.name)} name="password" id="password" placeholder="Masukan password anda" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
					</div>
					<button type="submit" class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center">Masuk akunmu</button>
					<div class="text-sm font-medium text-gray-500">
						Belum daftar? <a href="/" class="text-teal-500 hover:underline ml-1">Buat akun</a>
					</div>
				</form>
			</div>
		</div >
    </section>
  )
}
