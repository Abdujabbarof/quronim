// import React from 'react'
import sass from '../main.module.scss'
import { instance } from '../../utils/Instance'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { use } from '../../utils/Context'



function All() {
  type typeOfMap = {
    id: string;
    arabic_text: string;
    translation: string;
    aya: number
  }

  type typeOfObject =  {
    englishName: string;
    name: string;
    englishNameTranslation: string;
    number: number;
  }
  type audio1type ={
    audio: string;
    audioSecondary : string[];
    hizbQuarter: number;
    juz : number;
    manzil: number;
    number: number;
    numberInSurah: number;
    page: number;
    ruku : number
    sajda: boolean;
    text: string;
  }[]



  const {lang} = useContext(use)
  const [post, setpost] = useState<typeOfObject | null>(null)
  const [posts, setposts] = useState([])
  const [count, setcount] = useState(0)
  const audio = useRef<HTMLAudioElement>(null!)
  const nav = useNavigate()
  const [audio1, setaudio] = useState<audio1type>([])
  const {number} = useParams()
  const [isLoading, setiseLoading] = useState(true)

  useEffect(() =>{
     instance.get(`/surah/${number}`)
     .then(res => setpost(res.data.data)
     )
     
     axios.get(`https://quranenc.com/api/v1/translation/sura/${lang === "eng" ? "english_waleed" : lang === "uz" ? "uzbek_mansour" : "turkish_shahin"}/${number}`)
     .then(res => {setposts(res.data.result)
        setiseLoading(false)})

     instance.get(`surah/${number}/ar.alafasy`)
       .then(res => setaudio(res.data.data.ayahs))
  }, [number, lang])

const start = (id: number) => {
  setcount(id)
  audio.current.src = audio1[id - 1].audio
  audio?.current?.play()
}

const next = () => {
  audio.current.src = audio1[count + 1].audio
  audio.current?.play()
  setcount(prev => prev + 1);
}

const last = () => {
  audio.current.src = audio1[count - 1].audio
  audio.current?.play()
  setcount(prev => prev - 1);
}

const pause = () => {
  audio.current.src = audio1[count - 1].audio
  // audio.current.audio.pause()

}

const min = () =>{
   nav(`/surah`)
}


  return (
    isLoading ? <div className={sass.spinner}> <div className={sass.ldsspinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : 
    <div className={sass.all}>
      <button onClick={min}><i className="fa-solid fa-arrow-left"></i></button>
          <div className={sass.btn}>
                       <i onClick={() => last()} className="fa-solid fa-arrow-left"></i>
                       <i onClick={() => pause()} className="fa-solid fa-pause"></i>
                       <i onClick={() => next()} className="fa-solid fa-arrow-right"></i>
          </div>
       <ul>
        <h2>{post?.englishName}</h2>
        <h1>{post?.name}</h1>
        <h4>{post?.englishNameTranslation}</h4>
        <h1>{post?.number === 9 ? null : 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'}</h1>
        {posts.map((e: typeOfMap) => (
           <div key={e.id} className={sass.top}>
            
                 <div key={e.id} className={sass.surahs}>
                    <h5 >{e.arabic_text}</h5>
                    <h3>{e.translation}</h3>
                    <audio ref={audio} controls src=""></audio>
                    <i onClick={() => start(e.aya)} className="fa-solid fa-circle-play"></i>
                    <div className={sass.border}></div>
                  </div>
           </div>
        ))}
       </ul>
    </div>
  )
}

export default All