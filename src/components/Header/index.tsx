import sass from '../c.module.scss'
import logo from '../../pages/img/m.png'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useContext } from 'react'
import { use } from '../../utils/Context'

function Header() {
  const check = useRef<HTMLDivElement>(null)
  const {lang, change} = useContext(use)
  console.log(lang)

  const toggle = ()=>{
    check?.current?.classList.toggle(sass.left)
    console.log(true)
  }

  return (
    <div className={sass.header}>
         <header>
           <div className={sass.logo}>
             <Link to={'/'}><img src={logo} alt="" />   <h1>Furqon Kids</h1></Link>
           </div>
           <div className={sass.menu}>
              <ul > 
                {/* <li><div className={sass.icon}>
                   <i class="fa-solid fa-moon"></i>
                  </div></li> */}
                <li>
                  {/* <div className={sass.search}>
                   <Link to={'/surah'}><i class="fa-solid fa-magnifying-glass"></i></Link>
                  </div> */}
                  <div className={sass.search}>
                  <select  onChange={(e) => change(e.target.value)}>
                      <option value="uz">Uz</option>
                      <option value="eng">Eng</option>
                      <option value="tur">Tur</option>
                   </select>
                  </div>
                </li>
                <div  onClick={toggle} className={sass.bar}>
                <i className="fa-solid fa-bars"></i>
                </div>
              </ul>

           </div>
         </header>
              <div ref={check} className={sass.res}>
                  <ul>
                  <div onClick={toggle} className={sass.xmark}>
                <i className="fa-solid fa-xmark"></i>
                </div>
                   <Link to={'/'}><li>Home</li></Link>
                    <Link to={'/surah'}><li>Surahs of Quran</li></Link>
                    <Link to={'/namoz'}> <li>Prayer Times</li></Link>
                    <div className={sass.lang}>
                        <p  onClick={() => change("uz")}>Uz</p>
                        <p  onClick={() => change("eng")}>Eng</p>
                        <p  onClick={() => change('tur')}>Tur</p>
                    </div>
                    <div className={sass.search}>
                   <Link to={'/surah'}><i className="fa-solid fa-magnifying-glass"></i></Link>
                  </div>
                  </ul>
              </div>
    </div>
  )
}

export default Header