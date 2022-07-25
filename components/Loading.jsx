import style from "../styles/Loading.module.css"


export default function Loading() {
  return (
    <section className="h-screen bg-slate-400 flex items-center justify-center">
      <div class={style.wrapper}>
          <div class={style.circle}></div>
          <div class={style.circle}></div>
          <div class={style.circle}></div>
          <div class={style.shadow}></div>
          <div class={style.shadow}></div>
          <div class={style.shadow}></div>
      </div>
    </section>
  )
}
