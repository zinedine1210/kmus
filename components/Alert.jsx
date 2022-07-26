import { useState } from "react"



export default function Alert({user}) {
    const [alert, setAlert] = useState(user ? true:false)


    
  return (
    <>
        {user ? user.status == 0 && alert ? 
                <div className="w-full text-white bg-sky-500 mb-10">
                    <div className=" flex items-center justify-between px-5 py-4 mx-auto">
                        <div className="flex items-center">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                            <span className="mx-3 text-[16px]">Selamat Datang <span className="font-semibold">{user ? user.nama :""}</span>, Kamu harus memenuhi persyaratan dibawah ini untuk menjadi anggota</span>
                        </div>

                        <button onClick={() => setAlert(false)} className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                :"":""} 


                {user ? user.status == 1 && alert ? 
                <div className="w-full text-white bg-sky-500 mb-10">
                    <div className=" flex items-center justify-between px-5 py-4 mx-auto">
                        <div className="flex items-center">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                            <span className="mx-3 text-[16px]">Hallo <span className="font-semibold">{user ? user.nama :""}</span>, Kamu belum mengupload foto</span>
                        </div>

                        <button onClick={() => setAlert(false)} className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                :"":""} 


                {user ? user.status == 1 && alert ? 
                <div className="w-full text-white bg-sky-500 mb-10">
                    <div className=" flex items-center justify-between px-5 py-4 mx-auto">
                        <div className="flex items-center">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                            <span className="mx-3 text-[16px]">Mohon tunggu, Admin sedang memeriksa data diri anda</span>
                        </div>

                        <button onClick={() => setAlert(false)} className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                :"":""} 
    </>
  )
}
