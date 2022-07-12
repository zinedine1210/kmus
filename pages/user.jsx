import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Seo from "../public/seo"

export default function User() {
    const [active, setActive] = useState(false)
    const navbar = () => {
        if(active){
            setActive(false)
        }else{
            setActive(true)
        }
    }
  return (
    <>
        <Seo 
        title={"Dashboard"}
        description={"Dashboard Koperasi Jasa Mitra Usaha Sentosa"}
        />

        <nav className="flex items-center justify-between bg-white fixed top-0 px-3 lg:px-10 py-2 border w-full z-10">
            <div className="flex items-center">
                <Image src={"/logo.png"} width={60} height={60} objectFit="contain" quality={75} alt="navbar"/>
                <h1 className="text-xl lg:text-3xl font-semibold text-gray-700 ml-2">Dashboard</h1>
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
                <div class="relative">
                    <img class="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt=""/>
                    <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
            </div>
        </nav>

        <section className="flex">
            <aside className={`bg-white h-screen max-h-screen lg:w-2/12 pt-24 px-5 border absolute w-1/2 lg:relative lg:block ${active ? "block":"hidden"}`}>
                <div class="relative mb-5">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="search-navbar" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                </div>
                <ul className="text-gray-700 text-xl font-medium capitalize space-y-4">
                    <Link href={"/user"}>
                        <li className="cursor-pointer py-2 rounded-xl hover:bg-slate-100 px-3">Dashboard</li>
                    </Link>
                    <Link href={"/user"}>
                        <li className="cursor-pointer py-2 rounded-xl hover:bg-slate-100 px-3">Simpanan</li>
                    </Link>
                    <Link href={"/user"}>
                        <li className="cursor-pointer py-2 rounded-xl hover:bg-slate-100 px-3">Pinjaman</li>
                    </Link>
                </ul>
                <p className="text-gray-500 text-sm bottom-10 absolute">Bergabung pada 14 Mei 2020</p>
            </aside>
            <div className="pt-24 px-2 lg:px-8 bg-slate-100 w-full h-screen overflow-y-scroll">
                <div className="lg:flex items-center justify-center gap-3 space-y-2">
                    {/* Simpanan Wajib */}
                    <div className="bg-white rounded-xl shadow-md w-full lg:w-1/4 p-5">
                        <h1 className="text-4xl font-semibold text-gray-700">Rp. 50.000,-</h1>
                        <p className="text-xl mt-2 font-medium text-gray-500">Simpanan Wajib</p>
                    </div>

                    {/* Simpanan Pokok */}
                    <div className="bg-white rounded-xl shadow-md w-full lg:w-1/4 p-5">
                        <h1 className="text-4xl font-semibold text-gray-700">Rp. 200.000,-</h1>
                        <p className="text-xl mt-2 font-medium text-gray-500">Simpanan Pokok</p>
                    </div>

                    {/* Simpanan Sukarela */}
                    <div className="bg-white rounded-xl shadow-md w-full lg:w-1/4 p-5">
                        <h1 className="text-4xl font-semibold text-gray-700">Rp. 0,-</h1>
                        <p className="text-xl mt-2 font-medium text-gray-500">Simpanan Wajib</p>
                    </div>

                    {/* Total Simpanan */}
                    <div className="bg-white rounded-xl shadow-md w-full lg:w-1/4 p-5">
                        <h1 className="text-4xl font-semibold text-gray-700">Rp. 250.000,-</h1>
                        <p className="text-xl mt-2 font-medium text-gray-500">Total Simpanan</p>
                    </div>
                </div>

                <div className="lg:flex items-center mt-3">
                    <div className="bg-white rounded-xl shadow-md w-full lg:w-1/4 p-5">
                        <h1 className="text-4xl font-semibold text-gray-700">Rp. 0,-</h1>
                        <p className="text-xl mt-2 font-medium text-gray-500">Pinjaman</p>
                    </div>
                </div>
            </div>
        </section>

        
    </>
  )
}
