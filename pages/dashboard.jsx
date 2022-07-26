import Webcam from "react-webcam"
import Layout from "../components/Layout"
import Link from "next/link"


export default function Dashboard() {
    const [gambar, setGambar] = useState(null)
    const [active, setActive] = useState(3)
    const [status, setStatus] = useState(null)
    const [allow, setAllow] = useState(false)


    const {t} = useTranslation("common")

    useEffect(() => {

        const getXa = JSON.parse(localStorage.getItem("xa"))
        // Cek status user premember atau member
        AuthRepository.getDataUser({XA: getXa}).then(res => {
            // setStatus(res.data.status)
            console.log("asas", res.data);
        })
    
    },[])


  return (
    <Layout title={"Dashboard"} desc={"HALAMAN UTAMA ANGGOTA"} nav="Dashboard">
        {status == 15?
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-1 lg:gap-3">
            {/* Simpanan Wajib */}
            <div className="bg-white shadow-md w-full p-5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">Rp. 50.000,-</h1>
                <Link href={"/simpanan?tab=simpanan-wajib"}><p className="cursor-pointer text-sm lg:text-xl mt-0 lg:mt-2 font-light text-gray-500">Simpanan Wajib</p></Link>
            </div>

            {/* Simpanan Pokok */}
            <div className="bg-white shadow-md w-full p-5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">Rp. 200.000,-</h1>
                <Link href={"/simpanan?tab=simpanan-pokok"}><p className="cursor-pointer text-sm lg:text-xl mt-0 lg:mt-2 font-light text-gray-500">Simpanan Pokok</p></Link>
            </div>

            {/* Simpanan Sukarela */}
            <div className="bg-white shadow-md w-full p-5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">Rp. 0,-</h1>
                <Link href={"/simpanan?tab=simpanan-sukarela"}><p className="cursor-pointer text-sm lg:text-xl mt-0 lg:mt-2 font-light text-gray-500">Simpanan Sukarela</p></Link>
            </div>

            {/* Total Simpanan */}
            <div className="bg-white shadow-md w-full p-5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">Rp. 250.000,-</h1>
                <Link href={"/simpanan?tab=total-simpanan"}><p className="cursor-pointer text-sm lg:text-xl mt-0 lg:mt-2 font-light text-gray-500">Total Simpanan</p></Link>
            </div>

            {/* Pinjaman */}
            <div className="bg-white shadow-md w-full p-5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">Rp. 0,-</h1>
                <Link href={"/simpanan?tab=pinjaman"}><p className="cursor-pointer text-sm lg:text-xl mt-0 lg:mt-2 font-light text-gray-500">Pinjaman</p></Link>
            </div>
        </div>
        :
        <div className="w-full">

            <div className="flex items-center justify-center lg:hidden gap-5">
                <div>
                    <div className="flex items-center justify-center">
                        <span className={`${active == 1?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl`}>
                            1
                        </span>
                    </div>
                    <p className="font-semibold text-[16px] text-center mt-2">Lengkapi Data Diri Anda</p>
                </div>
                <div>
                    <div className="flex items-center justify-center">
                        <span className={`${active == 2?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl`}>
                            2
                        </span>
                    </div>
                    <p className="font-semibold text-[16px] text-center mt-2">Upload Foto Anda</p>
                </div>
                <div>
                    <div className="flex items-center justify-center">
                        <span className={`${active == 3?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl`}>
                            3
                        </span>
                    </div>
                    <p className="font-semibold text-[16px] text-center mt-2">Verifikasi Oleh Admin</p>
                </div>
            </div>

            <div className="lg:flex items-center justify-center hidden">
                <div className="flex items-center gap-2">
                    <span className={`${active == 1?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl`}>
                        1
                    </span>
                    <span className="text-sm font-semibold">Lengkapi Data Diri Anda</span>
                    <hr className="w-20 border-2 border-gray-400"/>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`${active == 2?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl`}>
                        2
                    </span>
                    <span className="text-sm font-semibold">Upload Foto Anda</span>
                    <hr className="w-20 border-2 border-gray-400"/>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`${active == 3?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl`}>
                        3
                    </span>
                    <div className="text-sm font-semibold">
                        <span className="block">Verifikasi Oleh Admin</span>
                        <span className="block">Bayar Virtual Account</span>
                    </div>
                </div>

            </div>

            {/* STEP 1 */}
            <div className={`${active == 1?"block":"hidden"} bg-white w-full rounded-md mt-5 p-10`}>
                <h1 className="title">Lengkapi data diri</h1>
                <Formulir t={t}/>
                
            </div>

            {/* STEP 2 */}
            <div className={`${active == 2?"block":"hidden"} bg-white w-full rounded-md mt-5 p-10`}>
                <h1 className="title">Upload Foto</h1>
                <div className="mt-10">
                    <h1 className="text-gray-600 text-sm lg:text-[16px]">Foto Anda dengan KTP</h1>
                    {
                        gambar ?
                        <div className="relative w-full border border-dashed border-gray-500 mx-auto">
                            <img src={gambar} alt={gambar} className="text-center mx-auto"/>
                            <button onClick={() => setGambar(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full shadow-sm flex items-center justify-center bg-gray-200">
                                <svg class="w-7  h-7 stroke-red-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                        :
                        <button onClick={() => document.getElementById("photo").classList.toggle("hidden")} className="w-full lg:w-1/2 h-[500px] border border-dashed border-gray-500 rounded-xl flex items-center justify-center">
                            <h1 className="font-semibold text-xl text-gray-500 uppercase">Buka Kamera</h1>
                        </button>
                    }
                </div>
                {allow ? 
                    <div className="absolute h-screen top-0 flex items-center justify-center z-40 hidden" id="photo">
                        <section className="relative">
                            <Webcam
                                audio={false}
                                height={720}
                                screenshotFormat="image/jpeg"
                                width={1280}
                                videoConstraints={{
                                    width: 1280,
                                    height: 720,
                                    facingMode: "user"
                                }}
                            >
                                {({ getScreenshot }) => (
                                <>
                                    <button className="absolute bottom-10 left-1/2 -translate-y-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-white rounded-full bg-slate-300" aria-label="cekrek" 
                                    onClick={() => {
                                        const imageSrc = getScreenshot()
                                        setGambar(imageSrc)
                                    }}
                                    ></button>
                                    <button onClick={() => document.getElementById("photo").classList.toggle("hidden")} className="absolute top-10 right-10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </>
                                )}
                            </Webcam>
                        </section>
                    </div>
                :""}
                <button className="btn-secondary mr-2 mt-5" onClick={() => setActive(active - 1)}>Prev</button>
                <button className="btn-main" onClick={() => setActive(active + 1)}>Next</button>
            </div>
            
            {/* STEP 3 */}
            <div className={`${active == 3?"block":"hidden"} bg-white w-full rounded-md mt-5 p-10`}>
                <h1 className="title">Verifikasi Permintaan Anda oleh Admin</h1>
                <button className="" onClick={() => setActive(active + 1)}>Next</button>
                <button onClick={() => setActive(active - 1)}>Prev</button>
            </div>

            {/* STEP 4 */}
            <div className={`${active == 4?"block":"hidden"} bg-white w-full rounded-md mt-5 p-10`}>
                <h1 className="title">Bayar</h1>
                <button className="btn-main" onClick={() => setActive(active + 1)}>Next</button>
                <button onClick={() => setActive(active - 1)}>Prev</button>
            </div>
        </div>
        }
    </Layout>
  )
}


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import AuthRepository from "../repositories/AuthRepository"
import Formulir from "../components/Formulir"

export async function getServerSideProps({ locale }) {

  // console.log(defaultLocale, locale, req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    }
  };
}