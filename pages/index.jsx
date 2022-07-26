import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Swal from 'sweetalert2'
import 'antd/dist/antd.css'
import Seo from "../public/seo"
import AuthRepository from '../repositories/AuthRepository';



export default function Home() {
  const {t} = useTranslation("common")
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(1)
  const router = useRouter()
  const deflocale = router.locale
  const [language, setLanguage] = useState(deflocale)
  const {theme, setTheme} = useTheme("light")
  const [cek, setCek] = useState(false)


  const [data, setData] = useState(null)

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



  useEffect(() => {

    setMounted(true)

  }, [])



  const nextStep = (value, lang) => {
    if(value){
      setActive(active + 1)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: lang("maaf"),
      })
    }
  }

  const prevStep = () => {
    if(active <= 1){

    }else{
      setActive(active - 1)
    }
  }

  const settingsLanguage = (value) => {
    if (value == "id") {
      router.push("/", "/", { locale: "id" })
      setLanguage("id")
    } else if (value == "en") {
      router.push("/", "/", { locale: "en" })
      setLanguage("en")
    }
  }

  const submitFinal = (e, cek) => {
    e.preventDefault()
    if(!cek){
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Maaf, anda harus menyetujui persyaratan",
      })
      
    }

    let obj = {
      alamat:"",
      no_ktp:0,
      tempat:"",
      pekerjaan:"",
      hp:"",
      ibu:"",
      sumber_dana:"",
      alamat_lengkap:"",
      bank_no_rek:0,
      bank_user_name:"",
      bank_code:0,
    }

    setData(Object.assign(data, obj))
    console.log(data);


    AuthRepository.postRegister(data).then(res => {
      if(res.response?.status == 400){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Terjadi Kesalahan'
        })
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Pendaftaran Berhasil',
          text: 'Silahkan periksa email anda'
        })
        setActive(5)
      }
    })
  }


  if (!mounted) return null


  return (
    <>
      <Seo 
      title={t("home")}
      description={"MMS Koperasi Jasa Mitra Usaha"}
      />
      <section className='max-h-screen h-screen'>
          <div className='lg:flex items-center justify-center'>
              {/* kiri */}
              <div className='h-full lg:h-screen w-full overflow-y-scroll lg:w-1/4 bg-slate-800 px-2 py-2' id='timeline2'>
                  <div className="mt-2 mb-5 flex items-center">
                      <span className="w-1/4 text-center"><Image src={"/logo.png"} width={60} height={60} quality={50} objectFit="contain" alt="logo" /></span>
                      <div className="w-3/4">
                          <h1 className="text-white text-xl font-semibold">Koperasi Jasa Mitra Usaha Sentosa</h1>
                            <Link href={"/login"}>
                                <span className="cursor-pointer text-white text-sm border py-1 px-5 rounded-lg lg:hidden">Login</span>
                            </Link>
                      </div>
                  </div>

                  <div className="justify-between flex items-center mt-2 lg:hidden">
                      <div className="flex items-center gap-2">
                          <label htmlFor="darkmode" className="inline-flex items-center space-x-1 cursor-pointer dark:text-gray-100">
                          <span className="relative">
                              <input id="darkmode" type="checkbox" className="hidden peer" onClick={() => setTheme(theme == "light"? "dark":"light")} />
                              <div className="w-20 h-9 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-violet-400 bg-gray-100"></div>
                              <div className={`absolute inset-y-0 left-0 w-10 h-7 flex items-center justify-center m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800 ${theme == "light"?"bg-primary":"bg-slate-500"}`}>
                                  {/* {theme} */}
                                  {/* dark */}
                                  <svg className={`${theme == "dark"?"":"hidden"} w-6 h-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>

                                  {/* light */}
                                  <svg className={`${theme == "light"?"":"hidden"} w-6 h-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                              </div>
                          </span>
                          
                      </label>

                      <div className="relative">
                          <label htmlFor="countries" className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg className="w-6 h-6 stroke-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                          </label>
                          <select id="countries" onChange={(e) => settingsLanguage(e.target.value)} className=" py-2 text-white text-sm rounded-lg block w-full bg-inherit border-none pl-10 pr-7  dark:placeholder-gray-400 dark:text-white focus:outline-none" placeholder="Bahasa" >
                              <option disabled selected>{language == 'id' ? "Indonesia" : "English"}</option>
                              <option className="font-light text-sm" value={"id"}>Indonesia</option>
                              <option className="font-light text-sm" value={"en"}>English</option>
                          </select>
                      </div>
                      </div>

                      <button type="button" onClick={() => document.getElementById("navbar").classList.toggle("hidden")} className="lg:hidden text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                          <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                          Timeline
                      </button>

                      
                  </div>

                  <div className={`mt-10 hidden lg:block`} id="navbar">
                      <div className="w-full px-2 lg:px-5">

                          {/* STEP 1 */}
                          <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                              <div>
                              <div className="flex items-center justify-center w-10 h-10 border-2 text-white border-white rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`${active == 1 ?"inline":"hidden"} w-6 h-6 text-white`} fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                  </svg>


                                  <svg className={`${active > 1?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>

                                  <svg className={`${active < 1?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </div>
                              </div>
                              <div className="w-px h-full bg-white"></div>
                          </div>
                          <div className="pb-8 ">
                              <p className="mb-0 2xl:mb-2 text-sm 2xl:text-xl font-bold text-white ">{t("syaratanggota")}</p>
                              <p className="text-white">
                              {t("anggotadesk")}
                              </p>
                          </div>
                          </div>

                          {/* STEP 2 */}
                          <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                              <div>
                              <div className="flex items-center justify-center w-10 h-10 border-2 text-white border-white rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`${active == 2 ?"inline":"hidden"} w-6 h-6 text-white`} fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                  </svg>


                                  <svg className={`${active > 2?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>

                                  <svg className={`${active < 2?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </div>
                              </div>
                              <div className="w-px h-full bg-white"></div>
                          </div>
                          <div className="pb-8 ">
                              <p className="mb-0 2xl:mb-2 text-sm 2xl:text-xl font-bold text-white ">{t("kewajibananggota")}</p>
                              <p className="text-white">
                              {t("kewajibandesk")}
                              </p>
                          </div>
                          </div>
                          

                          {/* STEP 3 */}
                          <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                              <div>
                              <div className="flex items-center justify-center w-10 h-10 border-2 text-white border-white rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className={`${active == 3 ?"inline":"hidden"} w-6 h-6 text-white`} fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                  </svg>


                                  <svg className={`${active > 3?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>

                                  <svg className={`${active < 3?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </div>
                              </div>
                              <div className="w-px h-full bg-white"></div>
                          </div>
                          <div className="pb-8 ">
                              <p className="mb-0 2xl:mb-2 text-sm 2xl:text-xl font-bold text-white ">{t("formulir")}</p>
                              <p className="text-white">
                              {t("konfirmasidesk")}
                              </p>
                          </div>
                          </div>


                          {/* DONE */}
                          <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                              <div>
                              <div className="flex items-center justify-center w-10 h-10 border-2 text-white border-white rounded-full">


                                  <svg className={`${active == 5?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>

                                  <svg className={`${active < 5?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </div>
                              </div>
                          </div>
                          <div className="pb-8 ">
                              <p className="mb-0 2xl:mb-2 text-sm 2xl:text-xl font-bold text-white ">{t("selesai")}</p>
                              <p className="text-white">
                              {t("selesaidesk")}
                              </p>
                          </div>
                          </div>
                          
                      </div>
                  </div>
              </div>

              {/* Kanan */}
              <div className="h-screen w-full lg:w-3/4 overflow-y-scroll bg-white dark:bg-dark relative">
                  <div className="w-3/4 fixed bg-white dark:bg-dark shadow-sm items-center py-4 px-5 hidden lg:flex justify-between">
                      <div className="flex items-center gap-2">
                          <label htmlFor="darkwebsite" className="inline-flex items-center space-x-1 cursor-pointer dark:text-gray-100">
                              <span className="relative">
                                  <input id="darkwebsite" type="checkbox" className="hidden peer" onClick={() => setTheme(theme == "light"? "dark":"light")} />
                                  <div className="w-20 h-9 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-violet-400 bg-gray-100"></div>
                                  <div className={`absolute inset-y-0 left-0 w-10 h-7 flex items-center justify-center m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800 ${theme == "light"?"bg-primary":"bg-slate-500"}`}>
                                      {/* {theme} */}
                                      {/* dark */}
                                      <svg className={`${theme == "dark"?"":"hidden"} w-6 h-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>

                                      {/* light */}
                                      <svg className={`${theme == "light"?"":"hidden"} w-6 h-6`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                  </div>
                              </span>
                              
                          </label>

                          <div className="relative">
                              <label htmlFor="countries2" className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <svg className="w-6 h-6 stroke-slate-800 dark:stroke-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                              </label>
                              <select id="countries2" onChange={(e) => settingsLanguage(e.target.value)} className=" py-2 text-sm rounded-lg block w-full bg-inherit border-none pl-10 pr-7  dark:placeholder-gray-400 dark:text-white text-slate-700 focus:outline-none" placeholder="Bahasa" >
                                  {/* <option disabled selected>{language == 'id' ? "Indonesia" : "English"}</option> */}
                                  <option className="font-light text-sm" selected={language =="id"? true:false} value={"id"}>Indonesia</option>
                                  <option className="font-light text-sm" selected={language =="en"? true:false} value={"en"}>English</option>
                              </select>
                          </div>
                      </div>

      
                      <Link href={"/login"}>
                          <span className="cursor-pointer py-2 px-5 rounded-lg bg-slate-600 text-white inline-block font-semibold dark:bg-white dark:text-dark">Login</span>
                      </Link>
                  </div>
                  <div className="bg-inherit px-2 md:px-10 lg:px-24 py-5 lg:py-20">
                      {/* STEP 1 */}
                      <div className={`${active == 1 ? "block":"hidden"} h-full`}>
                      <article>
                          <h1 className="title">{t("judulsyarat")}</h1>

                          <ul className="list-decimal text-gray-600 ml-10">
                          {t("syarat", {returnObjects:true}).map((item, id) => {
                              return <li key={id} className="leading-6 lg:leading-7 text-sm lg:text-[16px] dark:text-gray-300">{item.text}</li>
                          })}
                          </ul>

                          <button className="btn-main mt-5 lg:mt-10" onClick={() => nextStep(true)}>{t("selanjutnya")}</button>
                          {/* <button className="btn-secondary">{t("sebelumnya")}</button> */}
                      </article>
                      </div>
                      

                      {/* STEP 2 */}
                      <div className={`${active == 2 ? "block":"hidden"} h-full`}>
                      <article>
                          <h1 className="title">{t("judulkewajiban")}</h1>

                          <ul className="list-decimal text-gray-600 ml-10">
                          {t("kewajiban", {returnObjects:true}).map((item, id) => {
                              return <li key={id} className="leading-6 lg:leading-7 text-sm lg:text-[16px] dark:text-gray-300">{item.text}</li>
                          })}
                          </ul>

                          <h1 className="title">{t("judulhak")}</h1>

                          <ul className="list-decimal text-gray-600 ml-10">
                          {t("hak", {returnObjects:true}).map((item, id) => {
                              return <li key={id} className="leading-6 lg:leading-7 text-sm lg:text-[16px] dark:text-gray-300">{item.text}</li>
                          })}
                          </ul>

                          <button className="btn-secondary" onClick={() => prevStep()}>{t("sebelumnya")}</button>
                          <button className="btn-main mt-5 lg:mt-10 ml-2" onClick={() => nextStep(true)}>{t("selanjutnya")}</button>
                      </article>
                      </div>


                      {/* STEP 3 */}
                      <div className={`${active == 3 ? "block":"hidden"} h-full`}>
                      <article>
                          <h1 className="title">{t("judulform")}</h1>
                          <form onSubmit={(e) => submitFinal(e, cek)}>
                            <div className="flex items-center gap-2">
                                <div className="relative border-2 rounded-lg border-gray-300 w-1/2">
                                <input type="text" id="nama" name="nama" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.0.placeholder")} required />
                                <label htmlFor="nama" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.0.text")}</label>
                                <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.0.helper")}</small>
                            </div>
                            <div className="relative border-2 rounded-lg border-gray-300 w-1/2">
                                <input type="email" id="email" name="email" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.7.placeholder")} required />
                                <label htmlFor="email" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.7.text")}</label>
                                <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.7.helper")}</small>
                            </div>
                            </div>
                          



                          <div className="text-zinc-600 mt-5 dark:text-gray-300">
                              <p className="leading-6 lg:leading-7 text-sm lg:text-[16px] dark:text-gray-300">{t("judulkonfirmasi")}</p>
                              <ul className="list-decimal ml-10 mt-5">
                              {t("listkonfirmasi", {returnObjects:true}).map((item, id) => {
                                  return <li key={id} className="leading-6 lg:leading-7 dark:text-gray-300 text-sm lg:text-[16px]">{item.text}</li>
                              })}
                              </ul>

                              <div className="flex items-center gap-5 mt-5">
                              <input type="checkbox" id="cek" value={true} className="" onClick={() => setCek(cek ? false:true)} />
                              <label htmlFor="cek" className="text-sm">{t("cek")}</label>
                              </div>

                          </div>

                          <button className="btn-secondary" onClick={() => prevStep()} type="button">{t("sebelumnya")}</button>
                          <button className={`btn-main mt-5 lg:mt-10 ml-2`} type="submit">{t("selanjutnya")}</button>
                          </form>
                      </article>
                      </div>

                      {/* DONE */}
                      <div className={`h-full  ${active == 5 ? "block":"hidden"}`}>
                      <article className="mt-10">
                          <div className="flex items-center justify-center">
                            <Image src={"/checked.png"} width={512} height={512} objectFit="contain" alt="checked" quality={50}/>
                          </div>
                          <h1 className="font-bold text-center text-5xl mt-5 dark:text-white">{t("titleselesai")}</h1>
                          <p className="font-extralight tracking-wider text-xl text-center uppercase dark:text-gray-300">{t("deskripsiselesai")}</p>
                      </article>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </>
  )
}



import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {

  // console.log(defaultLocale, locale, req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    }
  };
}