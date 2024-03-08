import { useState,useEffect } from "react"

const useGetOnlineStatus= () =>{
    const [details,setDetails] = useState('Online')
    useEffect(()=>{
        window.addEventListener("online",()=>{
            setDetails('Online')
        })
        window.addEventListener("offline",()=>{
            setDetails('Offline')
        })
    },([]))
    
        
    return details
}
export default useGetOnlineStatus