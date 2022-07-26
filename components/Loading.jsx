import style from "../styles/Loading.module.css"


export default function Loading() {
  return (
    <section className="h-screen bg-slate-400 flex items-center justify-center">
      <div className={style.wrapper}>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
          <div className={style.shadow}></div>
          <div className={style.shadow}></div>
          <div className={style.shadow}></div>
      </div>
    </section>
  )
}
