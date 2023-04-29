import { Route, Routes } from 'react-router-dom';
import Context from './utils/Context';
import Home from './pages/Home'
import Surah from './pages/Surah'
import Namoz from './pages/Namoz'
import Layout from './components/Layout'
import AllSurahs from './pages/AllSurahs'
function App() {
  return (
    <div>
           <Context>
           <Layout>
             <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/surah' element={<Surah/>}/>
                <Route path='/surah/:number' element={<AllSurahs/>}/>
                <Route path='/namoz' element={<Namoz/>}/>
             </Routes>
            </Layout>
           </Context>
    </div>
  );
}

export default App;
