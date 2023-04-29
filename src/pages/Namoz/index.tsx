import sass from '../main.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
const date = new Date()

function Namoz() {
  const [time, settime] = useState<typeForTime>(null!)
  const [isLoading, setisLoading] = useState(true)

  type typeForTime ={
    date: string;
    region: string
    weekday : string
     times: { 
      asr: string
      hufton :  string
      peshin :  string
      quyosh : string
      shom_iftor: string
      tong_saharlik : string
    }
  }
  useEffect(() =>{
    axios.get(`https://islomapi.uz/api/present/day?region=Toshkent`)
    .then(res => {settime(res.data) 
       setisLoading(false)})
  }, [])
  
  const currentTime =[ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()]
  const cur = date.getHours()

  return (
    isLoading ? <div className={sass.spinner}> <div className={sass.ldsspinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> :
    <div className={sass.namoz}>
         <div className={sass.main}>
               <h1>{time?.region}</h1>
                <div className={sass.bottom}>
                <div className={sass.date1}>
                <h4>{time?.weekday} ,</h4>
                <h3>{time?.date}</h3>
                <div className={sass.date}>
               <input type="text" value={currentTime} readOnly />
                </div>
                </div>
                </div>
         </div>
         <div className={sass.times}>
            <ul>
              <li className={cur > +time.times.hufton.slice(0,2) && cur <= +time.times.quyosh.slice(0,2)  ? sass.active : sass.li}>Tong: <h5>{time?.times.tong_saharlik}</h5></li>
                <div className={sass.border}></div>
              <li className={cur > +time.times.quyosh.slice(0,2) && cur <= +time.times.peshin.slice(0,2)  ? sass.active : sass.li}>Quyosh : <h5>{time?.times.quyosh}</h5></li>
              <div className={sass.border}></div>
              <li className={cur > +time.times.peshin.slice(0,2) && cur <= +time.times.asr.slice(0,2)  ? sass.active : sass.li}>Peshin : <h5>{time?.times.peshin}</h5></li>
              <div className={sass.border}></div>
              <li className={cur > +time.times.asr.slice(0,2)  && cur <= +time.times.shom_iftor.slice(0,2)  ? sass.active : sass.li}>Asr : <h5>{time?.times.asr}</h5></li>
              <div className={sass.border}></div>
              <li className={cur > +time.times.shom_iftor.slice(0,2)  && cur <= +time.times.hufton.slice(0,2)  ? sass.active : sass.li}>Shom, Iftor : <h5>{time?.times.shom_iftor}</h5></li>
              <div className={sass.border}></div>
              <li className={cur > +time.times.hufton.slice(0,2)  && cur <= +time.times.tong_saharlik.slice(0,2)  ? sass.active : sass.li}>Xufton : <h5>{time?.times.hufton}</h5></li>
            </ul>
         </div>
    </div>
  )
}

export default Namoz