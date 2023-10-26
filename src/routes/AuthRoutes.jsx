import { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

import axios from './../utils/axios'
import Loader from "../components/Loader"

const AuthRoutes = () => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return setToken(false)
    }
    
    axios.get(`/auth/verify-token/${userData.role}`)
    .then((user) => {
        if (user.data.data.role == 'ADMINISTRATOR') {
          return navigate('/administrator/dashboard')
        }
  
        if (user.data.data.role == 'MAHASISWA') {
          return navigate('/')
        }
  
        if (user.data.data.role == 'DOSEN') {
          return navigate('/dosen/dashboard')
        }
        setToken(true)}
      )
      .catch(() => {
        return setToken(false)
      })
  }, [])

  if (token === null) {
    return <Loader />
  }

  return (
    token ? <Navigate to="/" /> : <Outlet />
  )
}

export default AuthRoutes