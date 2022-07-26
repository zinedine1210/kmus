import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Link from "next/link"
import Seo from "../public/seo"
import {G} from "../global/global.min.js"
import AuthRepository from "../repositories/AuthRepository.js";
import Swal from "sweetalert2";
import Loading from "../components/Loading"




export default function Login() {
	const [data, setData] = useState(null)
	const Router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const getXa = JSON.parse(localStorage.getItem("xa"))
		AuthRepository.getStatus({XA:getXa, param:"user"}).then(res => {
			if(res.status < 0){
				setLoading(true)
			}else{
				Router.push("/dashboard")
			}
		})
	}, [])

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
				if(responseData.token){
					// this.setState({errorLogin:false})
					localStorage.setItem("xa", JSON.stringify(responseData.token));
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Berhasil login',
						showConfirmButton: false,
						timer: 3000
					})
					Router.push('/dashboard');
				} else {
					Swal.fire({
						icon:"error",
						title:"Username atau password salah"
					})
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

	}

	if(!loading) return <Loading />

  return (
    <>
	<Seo 
	title="Login"
	description={"Login MMS Koperasi Jasa Mitra Usaha Sentosa"}
	/>

    <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3 bg-slate-800" id="login">
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
						<h1 className="text-white text-6xl uppercase font-semibold">Login</h1>
                        <h3 className="text-4xl font-bold text-white">Koperasi Jasa Mitra Usaha Sentosa</h3>
                        
                        <p className="max-w-xl mt-3 text-xl text-gray-300 tracking-wider">Belum membuat akun? <Link href={"/"}><span className="inline-block font-semibold cursor-pointer hover:text-blue-400">Buat akun</span></Link></p>
						
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md mx-auto lg:w-2/6">
                <div className="p-6 sm:p-8 lg:p-10 border space-y-8 w-full">
					<div className="text-center">
						<h1 className="text-3xl font-semibold lg:hidden dark:text-white">Koperasi Jasa Mitra Usaha Sentosa</h1>
						<p className="text-gray-500 dark:text-gray-300 tracking-wider text-sm uppercase">Masuk untuk mengakses akun Anda</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={(e) => handlerSubmit(e)}>
						<div>
							<label for="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-white">Username</label>
							<input type="text" name="username" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Masukkan username anda" required onChange={(e) => handlerChange(e.target.value, e.target.name)}/>
						</div>
						<div>
							<label for="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-white">Password</label>
							<input type="password" onChange={(e) => handlerChange(e.target.value, e.target.name)} name="password" id="password" placeholder="Masukan password anda" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required />
						</div>
						<button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center">Masuk Akunmu</button>
					</form>
				</div>
            </div>
        </div>
    </section>
	</>
  )
}
