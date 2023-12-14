import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Logo from './../assets/logo-circle.svg'
import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const Sidebar = ({ Menus }) => {
  const [openModal, setOpenModal] = useState(undefined)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    setOpenModal(undefined)
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    return navigate('/login')
  }

  return (
    <>
      <div
        className={`w-fit sm:w-60 sticky top-0 left-0 h-screen bg-white duration-300 border-r dark:border-gray-600 p-5 dark:bg-slate-800 z-40`}
      >
        <div className={`sm:gap-x-4 flex items-center`}>
          <img src={Logo} alt='Logo' className='ml-2 h-8 rounded' />
          <span className='hidden sm:block text-xl font-medium whitespace-nowrap dark:text-white'>
            SIJUTA
          </span>
        </div>

        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <NavLink to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                  }`}
              >
                <span className='text-gray-600 text-xl'>{menu.src}</span>
                <span
                  className={`hidden sm:block origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </NavLink>

          ))}
          <li
            onClick={() => setOpenModal('confirm-logout')}
            className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:bg-gray-700 mt-2 text-red-500`}
          >
            <span className='text-xl'>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span
              className={`hidden sm:block origin-left duration-300 hover:block`}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>

      <Modal
        show={openModal === 'confirm-logout'}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Kamu yakin ingin keluar?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleLogout}>
                Ya, saya yakin
              </Button>
              <Button color="gray" onClick={() => setOpenModal(undefined)}>
                Batal
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Sidebar