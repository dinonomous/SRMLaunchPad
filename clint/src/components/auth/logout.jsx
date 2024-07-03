import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const logout = () => {
    const navigate = useNavigate()
  return (
    useEffect(()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        navigate('/')
    },[])
  )
}

export default logout