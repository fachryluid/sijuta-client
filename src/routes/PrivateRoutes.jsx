import { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import Loader from "../components/Loader"

const PrivateRoutes = ({ role }) => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (!accessToken) {
      toast.error('Akses tidak valid')
      return navigate('/login')
    }

    axios.get(`/auth/verify-token/${userData.role}`)
      .then((user) => {
        if (user.data.data.role != role) {
          return setToken(false)
        }
        setToken(true)
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message)
        return setToken(false)
      })
  }, [])

  if (token === null) {
    return <Loader />
  }

  return (
    token ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes