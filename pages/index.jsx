import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Swal from 'sweetalert2'
import 'antd/dist/antd.css'
import { Select, DatePicker } from "antd";
const { Option } = Select
import axios from "axios";
import Seo from "../public/seo"
import Image from "next/image";
import moment from "moment"
import AuthRepository from '../repositories/AuthRepository';


export default function Home() {
  const {t} = useTranslation("common")
  const [active, setActive] = useState(1)
  const router = useRouter()
  const deflocale = router.locale
  const [language, setLanguage] = useState(deflocale)
  const {theme, setTheme} = useTheme("light")
  const [cek, setCek] = useState(false)
  const [tempat, setTempat] = useState(null)
  const [bank, setBank] = useState(null)


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
    console.log(data);
  }

  useEffect(() => {
    axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi").then(res => {
      setTempat(res.data.provinsi)
    })

    axios.get("/bank.json").then(res => {
      setBank(res.data)
    })
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
    AuthRepository.postRegister({regis:data}).then(res => {
      console.log(res)
    })
  }

  const handlerSubmit = (e, cek) => {
    e.preventDefault()
    nextStep(cek, t)
  }

  return (
    <>
    <Seo 
      title={"MMS"}
      description={"Koperasi Jasa Mitra Usaha Sentosa"}
    />

    <section className="lg:flex lg:h-screen max-h-screen">
      <div className="w-full lg:w-1/4 px-2 lg:px-10 lg:h-screen h-full lg:overflow-hidden bg-slate-600 border lg:border-none pb-2" id="timeline">
        <div className="mt-2 flex gap-2 items-center">
          <span className="w-1/4"><Image src={"/logo.png"} width={80} height={80} quality={50} objectFit="contain" alt="logo" /></span>
          <div className="w-3/4">
            <h1 className="text-white text-xl  lg:text-2xl font-semibold">Koperasi Jasa Mitra Usaha Sentosa</h1>
          </div>
        </div>
        <div className="justify-between flex items-center mt-2">
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

        <div className={`h-[550px] lg:overflow-hidden hover:lg:overflow-y-scroll mt-10 lg:mt-20 hidden lg:block`} id="navbar">
          <div className="w-full">

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
                <p className="mb-2 text-xl font-bold text-white ">{t("syaratanggota")}</p>
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
                <p className="mb-2 text-xl font-bold text-white ">{t("kewajibananggota")}</p>
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
                <p className="mb-2 text-xl font-bold text-white ">{t("formulir")}</p>
                <p className="text-white">
                  {t("judulform")}
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border-2 text-white border-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${active == 4 ?"inline":"hidden"} w-6 h-6 text-white`} fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>


                    <svg className={`${active > 4?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>

                    <svg className={`${active < 4?"inline":"hidden"} w-6 h-6 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                </div>
                <div className="w-px h-full bg-white"></div>
              </div>
              <div className="pb-8 ">
                <p className="mb-2 text-xl font-bold text-white ">{t("konfirmasi")}</p>
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
                <p className="mb-2 text-xl font-bold text-white ">{t("selesai")}</p>
                <p className="text-white">
                  {t("selesaidesk")}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>


      <div className="w-full lg:w-3/4 py-5 lg:py-0 bg-white px-0 lg:px-10 h-full lg:overflow-y-scroll dark:bg-dark">
      
        {/* STEP 1 */}
        <div className={`${active == 1 ? "flex":"hidden"} items-center justify-center h-full px-5 lg:px-20 2xl:px-44`}>
          <article>
            <h1 className="title">{t("judulsyarat")}</h1>

            <ul className="list-decimal text-gray-600 ml-10">
              {t("syarat", {returnObjects:true}).map((item, id) => {
                return <li key={id} className="leading-6 lg:leading-8 text-sm lg:text-[18px] dark:text-gray-300">{item.text}</li>
              })}
            </ul>

            <button className="btn-main mt-5 lg:mt-10" onClick={() => nextStep(true)}>{t("selanjutnya")}</button>
            {/* <button className="btn-secondary">{t("sebelumnya")}</button> */}
          </article>
        </div>
        

        {/* STEP 2 */}
        <div className={`${active == 2 ? "flex":"hidden"} items-center justify-center h-full px-5 lg:px-20 2xl:px-44`}>
          <article>
            <h1 className="title">{t("judulkewajiban")}</h1>

            <ul className="list-decimal text-gray-600 ml-10">
              {t("kewajiban", {returnObjects:true}).map((item, id) => {
                return <li key={id} className="leading-6 text-sm lg:text-[18px] lg:leading-8 dark:text-gray-300">{item.text}</li>
              })}
            </ul>

            <h1 className="title">{t("judulhak")}</h1>

            <ul className="list-decimal text-gray-600 ml-10">
              {t("hak", {returnObjects:true}).map((item, id) => {
                return <li key={id} className="leading-6 text-sm lg:text-[18px] lg:leading-8 dark:text-gray-300">{item.text}</li>
              })}
            </ul>

            <button className="btn-secondary" onClick={() => prevStep()}>{t("sebelumnya")}</button>
            <button className="btn-main mt-5 lg:mt-10 ml-2" onClick={() => nextStep(true)}>{t("selanjutnya")}</button>
          </article>
        </div>


        {/* STEP 3 */}
        <div className={`${active == 3 ? "flex":"hidden"} items-center justify-center h-full px-5 lg:px-20 2xl:px-44`}>
          <article className="block w-full">
            <h1 className="title">{t("judulform")}</h1>

            {/* Nama lengkap */}
            <form onSubmit={(e) => handlerSubmit(e, true)} className="space-y-2 2xl:space-y-4 h-full 2xl:h-full overflow-y-auto">
              <div className="relative border-2 rounded-lg border-gray-300">
                  <input type="text" id="namalengkap" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" name="nama" placeholder={t("form.0.placeholder")} required 
                  onChange={(e) => handlerChange(e.target.value, e.target.name)}
                  />
                  <label htmlFor="namalengkap" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.0.text")}</label>
                  <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.0.helper")}</small>
              </div>



              {/* Alamat */}
              <div className="relative">
                <label htmlFor="message" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.1.text")}</label>
                <textarea id="message" name="alamat" rows="4" className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border-2 dark:text-white border-gray-300 focus:outline-none peer" placeholder={t("form.1.placeholder")} required onChange={(e) => handlerChange(e.target.value, e.target.name)}>
                </textarea>
                <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden mb-1 font-semibold text-xs">{t("form.1.helper")}</small>
              </div>


              {/* KTP SIM */}
              <div className="relative border-2 rounded-lg border-gray-300">
                  <input type="text" id="ktpsim" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.2.placeholder")} required name="no_ktp" onChange={(e) => handlerChange(e.target.value, e.target.name)} />

                  <label htmlFor="ktpsim" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.2.text")}</label>
                  <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.2.helper")}</small>
              </div>

              {/* tempat, taggal lahir */}
              <div className="flex items-center gap-2">
                <div className="relative border-2 border-gray-300 rounded-lg py-2 w-1/3">
                  <Select
                    showSearch
                    bordered={false}
                    placeholder={t("form.3.placeholder")}
                    optionFilterProp="children"
                    autoClearSearchValue={true}
                    loading={tempat ? false:true}
                    className="w-full peer dark:text-white"
                    id="tempat"
                    name="tempat"
                    required
                    onSelect={(e) => handlerChange(e, "tempat")}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                    {tempat ?
                    tempat.map((item, id) => {
                      return <Option key={id} value={item.nama}>{item.nama}</Option>
                    })
                    :""}
                  </Select>

                  <label htmlFor="tempat" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.3.text")}</label>

                </div>
                <div className="relative border-2 border-gray-300 rounded-lg py-2 w-2/3">
                  <DatePicker onChange={(e) => handlerChange(moment(e).format("YYYY-MM-DD"), "tgl_lhr")} format={"YYYY-MM-DD"} bordered={false} className="w-full peer dark:text-white" allowClear={true} placeholder={t("form.4.placeholder")}/>
                  <label htmlFor="tempat" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.4.text")}</label>
                </div>
              </div>


              {/* Pekerjaan */}
              <div className="relative border-2 rounded-lg border-gray-300">
                  <input type="text" id="pekerjaan" name="pekerjaan" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.5.placeholder")} required 
                  onChange={(e) => handlerChange(e.target.value, e.target.name)}/>
                  <label htmlFor="pekerjaan" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.5.text")}</label>
                  <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.5.helper")}</small>
              </div>



              {/* NO HP dan EMAIL */}
              <div className="flex items-center justify-center gap-2">
                <div className="relative border-2 rounded-lg border-gray-300 w-1/2">
                    <input type="text" id="hp" name="hp" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.6.placeholder")} required />
                    <label htmlFor="hp" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.6.text")}</label>
                    <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.6.helper")}</small>
                </div>


                <div className="relative border-2 rounded-lg border-gray-300 w-1/2">
                    <input type="email" id="email" name="email" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.7.placeholder")} required />
                    <label htmlFor="email" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.7.text")}</label>
                    <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.7.helper")}</small>
                </div>
              </div>


              {/* Nnama ibu dan sumber dana */}
              <div className="flex items-center justify-center gap-2">
                <div className="relative border-2 rounded-lg border-gray-300 w-1/2">
                    <input type="text" id="namaibu" name="ibu" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.8.placeholder")} required />
                    <label htmlFor="namaibu" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.8.text")}</label>
                    <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.8.helper")}</small>
                </div>


                <div className="relative border-2 rounded-lg border-gray-300 w-1/2">
                    <input type="text" id="sumber" name="sumber_dana" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.9.placeholder")} required />
                    <label htmlFor="sumber" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.9.text")}</label>
                    <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.9.helper")}</small>
                </div>
              </div>



              {/* Alamat */}
              <div className="relative">
                <label htmlFor="alamatlengkap" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.10.text")}</label>
                <textarea id="alamatlengkap" rows="4" className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border-2 dark:text-white border-gray-300 focus:outline-none peer" placeholder={t("form.10.placeholder")} required name="alamat_lengkap" onChange={(e) => handlerChange(e.target.value, e.target.name)}>
                </textarea>
                <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden mb-1 font-semibold text-xs">{t("form.10.helper")}</small>
              </div>

              <button className="btn-secondary" onClick={() => prevStep()} type="button">{t("sebelumnya")}</button>
              <button className="btn-main mt-5 lg:mt-10 ml-2" type="submit">{t("selanjutnya")}</button>
            </form>
          </article>
        </div>

        {/* STEP 4 */}
        <div className={`${active == 4 ? "flex":"hidden"} items-center justify-center h-full px-5 lg:px-20 2xl:px-44`}>
          <article>
            <h1 className="title">{t("judulpembayaran")}</h1>
            <form onSubmit={(e) => submitFinal(e, cek)}>
              <div className="flex items-center justify-center gap-y-2 flex-wrap">
                <div className="relative border-2 rounded-lg border-gray-300 lg:w-1/3 w-1/2">
                    <input type="number" id="norekening" name="bank_no_rek" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.11.placeholder")} required />
                    <label htmlFor="norekening" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.11.text")}</label>
                    <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.11.helper")}</small>
                </div>
                <div className="relative border-2 rounded-lg border-gray-300 lg:w-1/3 w-1/2">
                    <input type="text" id="namarekening" name="bank_user_name" onChange={(e) => handlerChange(e.target.value, e.target.name)} className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-800 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-transparent placeholder:focus:text-gray-500" placeholder={t("form.12.placeholder")} required />
                    <label htmlFor="namarekening" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.12.text")}</label>
                    <small className="peer-focus:peer-invalid:text-red-500 peer-focus:peer-invalid:block hidden ml-2 mb-1 font-semibold text-xs">{t("form.12.helper")}</small>
                </div>
                <div className="relative border-2 border-gray-300 rounded-lg py-2 lg:w-1/3 w-full">
                  <Select
                    showSearch
                    bordered={false}
                    placeholder={t("form.13.placeholder")}
                    optionFilterProp="children"
                    autoClearSearchValue={true}
                    loading={bank ? false:true}
                    className="w-full peer dark:text-white"
                    id="bank"
                    onChange={(e) => handlerChange(e, "bank_code")}
                    required
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                    {bank ?
                    bank.map((item, id) => {
                      return <Option key={id} value={item.code}>{item.name}</Option>
                    })
                    :""}
                  </Select>

                  <label htmlFor="bank" className="absolute text-sm font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-gray-800 dark:peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 dark:text-white">{t("form.13.text")}</label>
                </div>
              </div>
            



              <div className="text-zinc-600 mt-5 dark:text-gray-300">
                <p className="text-sm lg:text-[18px] dark:text-gray-300">{t("judulkonfirmasi")}</p>
                <ul className="list-decimal ml-10 mt-5">
                  {t("listkonfirmasi", {returnObjects:true}).map((item, id) => {
                    return <li key={id} className="leading-6 lg:leading-8 dark:text-gray-300 text-sm lg:text-[18px]">{item.text} {item.italic ? item.italic :""}</li>
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
        <div className={`flex items-center justify-center h-full px-72 ${active == 5 ? "block":"hidden"}`}>
          <article>
            <h1 className="font-bold text-center text-5xl">{t("selesai")}</h1>
            <button className="btn-secondary" onClick={() => prevStep()}>{t("sebelumnya")}</button>
          </article>
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