import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faGauge, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Loader from '../components/Loader'
import Sidebar from '../components/Sidebar'
import HeaderDashboard from '../components/HeaderDashboard'

const DosenLayout = ({ children, isLoading }) => {

  const Menus = [
    { title: 'Dashboard', path: '/dosen/dashboard', src: <FontAwesomeIcon icon={faGauge} /> },
    { title: 'Groups', path: '/dosen/groups', src: <FontAwesomeIcon icon={faUsers} /> },
    // { title: 'Profile', path: '/dosen/profile', src: <FontAwesomeIcon icon={faCircleUser} />, gap: true },
  ]

  return (
    <>
      {isLoading && <Loader />}
      <Sidebar Menus={Menus} />
      <div className="absolute top-0 h-screen overflow-y-scroll w-screen">
        <HeaderDashboard />
        <div className={`pl-28 sm:pl-64 w-full px-5 py-5`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default DosenLayout