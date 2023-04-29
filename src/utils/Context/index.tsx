import { ReactNode, createContext, useState } from "react";
export const use = createContext<LangContextType>({
    lang: 'uz',
    change: () => {}
})
export interface LangContextType {
    lang: string;
    change: (type: string) => void;
}


function Context({children}: {children: ReactNode}){
    const [lang, setlang] = useState('uz')
    console.log(lang)
    const change = (type: string) => {
        setlang(type)
    }
   return(
    <use.Provider value={{lang, change}}>
        {children}
    </use.Provider>
   )
}

export default Context