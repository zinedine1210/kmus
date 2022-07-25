import Webcam from "react-webcam"
import Layout from "../components/Layout"
import Link from "next/link"


export default function Dashboard() {
    const [gambar, setGambar] = useState(null)
    const [active, setActive] = useState(1)
    const [status, setStatus] = useState(null)
    const {t} = useTranslation("common")
    const [allow, setAllow] = useState(false)

    useEffect(() => {

        const getXa = localStorage.getItem("xa")
        // Cek status user premember atau member
        AuthRepository.getDataUser({XA: getXa}).then(res => {
            // setStatus(res.data.status)
            console.log(res.data);
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
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                    <span className={`${active == 1?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl `}>1</span>
                    <p className="text-sm font-semibold capitalize">Lengkapi data diri anda</p>
                    <hr className="border border-zinc-300 w-20"/>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className={`${active == 2?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl `}>2</span>
                    <p className="text-sm font-semibold capitalize">Upload Foto Anda</p>
                    <hr className="border border-zinc-300 w-20"/>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className={`${active == 3?"ring-green-500":"ring-zinc-200"} bg-white ring-2 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-2xl `}>3</span>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold capitalize inline-block">Verifikasi dari Admin</p>
                        <p className="text-sm font-semibold capitalize inline-block">Verifikasi dari Admin</p>
                    </div>
                </div>
            </div>

            {/* STEP 1 */}
            <div className={`${active == 1?"block":"hidden"} bg-white w-full rounded-md mt-5 p-10`}>
                <h1 className="title">Lengkapi data diri</h1>
                <Formulir t={t}/>
                <div className="space-x-2 mt-5">
                    <button onClick={() => setActive(active - 1)} className="btn-secondary">Sebelumnya</button>
                    <button className="btn-main" onClick={() => setActive(active + 1)}>selanjutnya</button>
                </div>
            </div>

            {/* STEP 2 */}
            <div className={`${active == 2?"block":"hidden"} bg-white w-full rounded-md mt-5 p-10`}>
                <h1 className="title">Upload Foto</h1>
                <div className="">
                    <h1 className="text-gray-600 text-xl font-semibold">Foto Diri</h1>
                    {console.log(gambar)}
                    {
                        gambar ?
                        <img src={gambar} alt="" />
                        :
                        <button onClick={() => setAllow(true)} data-modal-toggle="photo" className="w-1/2 h-[500px] border border-dashed border-gray-500 rounded-xl flex items-center justify-center">
                            <h1>Buka Kamera</h1>
                        </button>
                    }

                    <div id="photo" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <section className="relative bg-white">
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
                                    <button data-modal-toggle="photo" className="absolute top-10 right-10">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </>
                                )}
                            </Webcam>
                        </section>
                    </div>
                </div>
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