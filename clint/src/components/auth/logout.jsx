import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const logout = () => {
    const navigate = useNavigate()

  return (
    useEffect(()=>{
        Cookies.remove('token');
        localStorage.removeItem('email')
        navigate('/')
    },[])
  )
}

export default logout