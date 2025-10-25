import { createContext, useEffect, useState } from "react";


export const authContext =createContext();

export function AuthProvider({children}){

    const [token, settoken] = useState(null)
    const [userRole, setuserRole] = useState(null)
 

   

    useEffect(function(){

         if (localStorage.getItem("tokenJwt") !== null ) {
        settoken(localStorage.getItem("tokenJwt"))      
        setuserRole(localStorage.getItem("userRole")) 
         }
    },[])


  

    return  <authContext.Provider value={ { token  ,  settoken  , userRole , setuserRole  }   }>
            {children}
        </authContext.Provider>
    
}

