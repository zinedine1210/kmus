import Image from "next/image"
import Sidebar from "../components/Sidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AuthRepository from "../repositories/AuthRepository"
import Seo from "../public/seo"
import Loading from "./Loading"
import Link from "next/link"


export default function Layout({children, title, desc, nav}) {
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const Router = useRouter()
    const path = Router.asPath
    const navbar = () => {
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }
    }
    
    useEffect(() => {

        const getXa = JSON.parse(localStorage.getItem("xa"))

        // Cek xa user
        AuthRepository.getStatus({XA:getXa, param:"user"}).then(res => {
            if(res.status < 0){
                Router.push("/login")
            }else{
                Router.push(path)
                setLoading(true)
            }
        })


        AuthRepository.getDataUser({XA:getXa}).then(res => {
            setUser(res.data)
        })
    }, [path])


    if(!loading) return <Loading />


  return (
    <>
        <Seo 
        title={title}
        description={desc}
        />
        <nav className="flex items-center justify-between bg-white fixed top-0 px-3 lg:px-10 py-2 border w-full z-10">
            <div className="flex items-center">
                <Image src={"/logo.png"} width={60} height={60} objectFit="contain" quality={75} alt="navbar"/>
                <div className="ml-2">
                    <h1 className="text-sm lg:text-2xl font-semibold text-gray-700">Koperasi Jasa Mitra Usaha</h1>
                    <p className="text-gray-600 font-light text-xs lg:text-sm capitalize">{nav}</p>
                </div>
                <div class="relative ml-14 hidden">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="search-navbar" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="inline-block mr-2 lg:hidden" onClick={() => navbar()}>
                    <svg className={`w-6 h-6 ${active ? "hidden":"block"} stroke-slate-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>

                    <svg className={`w-6 h-6 ${active ? "block":"hidden"} stroke-slate-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/}svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>

                </button>
                <div class="relative hidden lg:block">
                    <Link href={"/user"}>
                        <span className="cursor-pointer rounded-full w-10 h-10 bg-slate-600 flex items-center justify-center text-white font-semibold text-2xl">
                            {user ? user.email.charAt(0) :""}
                        </span>
                    </Link>
                    <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
            </div>
        </nav>

        <section className="flex">
            <Sidebar active={active}/>
            <div className="pt-28 px-2 2xl:px-5 bg-slate-100 w-full h-screen overflow-y-scroll">
                {children}
            </div>
        </section>
    
    
    </>
  )
}
