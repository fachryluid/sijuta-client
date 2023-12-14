import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import MainLayout from '../../layouts/MainLayout'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from './../../utils/axios'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [stats, setStats] = useState({})
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setIsLoading(true)
      const user = JSON.parse(localStorage.getItem('userData'))
      const userRes = await axios.get(`/user/${user.uuid}/role/${user.role}`)
      setUser(userRes.data.data)
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message })
    } finally {
      getStats()
    }
  }

  const getStats = async () => {
    try {
      const { data } = await axios.get(`/journal/stats/stats`)
      console.log(data.data)
      setStats(data.data)
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MainLayout>
        <div className="half-bg px-5">
          <div className="max-w-lg mx-auto flex justify-between items-center bg-[#ffffff] px-5 py-3 rounded-xl shadow border">
            <div className="grow">
              <span className="text-xs">{user.idNumber}</span>
              <h2 className="font-medium">{user.name}</h2>
            </div>
            {/* <button className="relative bg-[#6246ea] w-8 h-8 flex justify-center items-center rounded-lg ms-5">
              <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-[#fffffe]" />
              <div className="absolute inline-flex items-center justify-center w-3 h-3 font-bold text-white bg-red-500 border border-white rounded-full -top-1 -right-1 dark:border-gray-900"></div>
            </button> */}
          </div>
        </div>
        <div className="max-w-lg mx-auto px-5 sm:px-2 mt-5 pb-20">
          <section className="grid grid-cols-2 gap-3">
            <div className='flex flex-col border px-5 py-3 rounded-xl border-2 border-gray-200 shadow'>
              <span className='text-3xl font-bold text-[#6246ea] mb-1'>{stats.totalJournals}</span>
              <span className='text-sm font-medium'>Kegiatan Saya</span>
            </div>
            <div className='flex flex-col border px-5 py-3 rounded-xl border-2 border-gray-200 shadow'>
              <span className='text-3xl font-bold text-[#6246ea] mb-1'>{stats.jurnalParafed}</span>
              <span className='text-sm font-medium'>Kegiatan Terparaf</span>
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  )
}

export default Dashboard