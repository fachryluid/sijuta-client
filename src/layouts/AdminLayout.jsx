import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUniversity, faBriefcase, faGauge, faCircleUser, faDatabase } from '@fortawesome/free-solid-svg-icons'
import Loader from '../components/Loader'
import Sidebar from '../components/Sidebar'
import HeaderDashboard from '../components/HeaderDashboard'

const AdminLayout = ({ children, isLoading, title }) => {

  const Menus = [
    { title: 'Dashboard', path: '/administrator/dashboard', src: <FontAwesomeIcon icon={faGauge} /> },
    { title: 'Master', path: '/administrator/master', src: <FontAwesomeIcon icon={faDatabase} /> },
    { title: 'KKN', path: '/administrator/fieldwork/kkn', src: <FontAwesomeIcon icon={faUniversity} /> },
    { title: 'Magang', path: '/administrator/fieldwork/magang', src: <FontAwesomeIcon icon={faBriefcase} /> },
    // { title: 'Profile', path: '/administrator/profile', src: <FontAwesomeIcon icon={faCircleUser} />, gap: true },
  ]

  return (
    <>
      {isLoading && <Loader />}
      <Sidebar Menus={Menus} />
      <div className="absolute top-0 h-screen overflow-y-scroll w-screen">
        <HeaderDashboard />
        <div className={`pl-28 sm:pl-64 w-full px-5 py-5`}>
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default AdminLayout