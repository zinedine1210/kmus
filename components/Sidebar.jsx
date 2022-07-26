import Link from "next/link"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import AuthRepository from "../repositories/AuthRepository"



export default function Sidebar({active}) {
    const Router = useRouter()

    const handlerLogout = () => {
        const getxa = localStorage.getItem("xa")
        AuthRepository.postLogout({XA:getxa}).then(res => {
            localStorage.removeItem("xa")
            Swal.fire({
                icon:"info",
                title:"Berhasil logout"
            })

            Router.push("/login")
        })
    }

  return (
    <aside className={`bg-white h-screen max-h-screen lg:w-3/12 pt-24 px-2 border absolute w-1/2 lg:relative lg:block ${active ? "block":"hidden"}`}>
                
                {/* askasa */}
                <div className="space-y-2 w-full text-gray-800">
                    <div className="flex items-center p-2 space-x-4 lg:hidden">
                        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full bg-gray-500" />
                        <div>
                            <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
                            <span className="flex items-center space-x-1">
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">View profile</a>
                            </span>
                        </div>
                    </div>
                    {/* <div className="relative mb-5">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                    </div> */}
                    <div className="divide-y divide-gray-300">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="hover:bg-slate-100 rounded-lg ">
                                <Link href={"/dashboard"}>
                                    <span className="cursor-pointer flex items-center p-2 space-x-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-600">
                                            <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                                        </svg>
                                        <span>Dashboard</span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                            <li className="hover:bg-slate-100 rounded-lg ">
                                <button onClick={() => handlerLogout()} className="flex items-center p-2 space-x-3 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current text-gray-600">
                                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                        <rect width="32" height="64" x="256" y="232"></rect>
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* ahsa */}
                <p className="text-gray-500 text-sm bottom-10 absolute">Bergabung pada 14 Mei 2020</p>
            </aside>
  )
}
