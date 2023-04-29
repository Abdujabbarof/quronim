// import React from 'react'
import sass from '../main.module.scss'
import { useEffect, useState } from 'react'
import { instance } from '../../utils/Instance'
import { Link } from 'react-router-dom'
import img from '../img/moon.png'
import books from '../img/book.png'
import { useMemo } from 'react'
function Surah() {
  type filterType ={
    number: number;
    englishName:string;
    numberOfAyahs: number;
    name: string;
    revelationType:string
  }
  type Setfilteredtype ={
    englishName: string
  }
  const [post, setpost] = useState([])
  const [search, setsearch] = useState('')
  useEffect(() =>{
    instance.get('/surah')
    .then(res => setpost(res.data.data))
    .then(res => console.log(res))
  }, [])

  const filteredItems = useMemo(
    () =>
      post.filter((item: Setfilteredtype) => item?.englishName?.toLowerCase().includes(search.toLocaleLowerCase())),
    [search, post],
  );
  return (
    <div className={sass.surah}>
      <div className={sass.book}>
        <img src={books} alt="" />
      </div>
      
        <form action="">
           <input onChange={(e) => setsearch(e.target.value)}  type="text" placeholder='Search' />
        </form>
        <div className={sass.moon}>
          <img src={img} alt="" />
        </div>
        <ul>
        {filteredItems.map((e: filterType) => (
           <Link key={e?.number} to={`/surah/${e?.number}`}> <li key={e?.number}><h4>{e?.number}</h4><h3>{e?.englishName} - {e?.numberOfAyahs}</h3><h1>{e?.name}</h1><h5>{e?.revelationType}</h5></li></Link>
         ))}
        </ul>
       
    </div>
  )
}

export default Surah