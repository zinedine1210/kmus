import Layout from "../components/Layout";
import { Select, DatePicker } from "antd";
import axios from "axios";
import 'antd/dist/antd.css'


export default function user() {
    const {t} = useTranslation("common")
    const [tempat, setTempat] = useState(null)
    const [bank, setBank] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {

        axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi").then(res => {
        setTempat(res.data.provinsi)
        })

        axios.get("/bank.json").then(res => {
        setBank(res.data)
        })
    },[])


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

    // const handlerSubmit = (e, value) => {

    // }
  return (
    <Layout title={"Edit User"} desc="Halaman Edit User" nav={"Profile"}>
        <article className="block bg-white w-full p-5 relative">
            <h1 className="title">Edit User</h1>

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

                <div className="flex items-center justify-center gap-2">
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

                <button className="btn-main mt-5 lg:mt-10 ml-2" type="submit">Simpan</button>
            </form>
        </article>
    </Layout>
  )
}


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

export async function getServerSideProps({ locale }) {

  // console.log(defaultLocale, locale, req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    }
  };
}