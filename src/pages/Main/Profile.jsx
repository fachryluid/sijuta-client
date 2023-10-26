import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faRightFromBracket, faUnlockKeyhole, faCircleQuestion, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import MainLayout from '../../layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import axios from './../../utils/axios'
import { serverUrl } from '../../utils/constants'

const Profile = ({ verifyToken }) => {
  const [openModal, setOpenModal] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: null,
    idNumber: null,
    avatar: null
  })
  const [avatars, setAvatars] = useState({
    males: [],
    females: []
  });
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      setIsLoading(true)
      const user = JSON.parse(localStorage.getItem('userData'))
      const { data } = await axios.get(`/user/${user.uuid}/role/${user.role}`)
      setProfile({
        name: data.data.name,
        idNumber: data.data.idNumber,
        avatar: data.data.avatar
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleChangeAvatar = async (avatar) => {
    try {
      setOpenModal(undefined)
      setIsLoading(true)
      const user = JSON.parse(localStorage.getItem('userData'))
      await axios.put(`/user/${user.uuid}/avatar`, {
        avatar
      })
      getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetAvatars = async () => {
    try {
      const avatars = await axios.get(`/auth/avatars`)
      setAvatars(avatars.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setOpenModal('change-avatar')
    }
  };

  const handleLogout = () => {
    setOpenModal(undefined)
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    return navigate('/login')
  }

  return (
    <>
      <MainLayout
        title="PROFIL"
        verifyToken={verifyToken}
        isLoading={isLoading}
      >
        <main className="max-w-lg mx-auto px-5 sm:px-2 mt-5 pb-20">
          <section className="flex justify-between items-start max-w-lg mx-auto px-5 sm:px-2 py-3 pb-4">
            <div className="text-gray-600">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-lg font-medium">{profile.idNumber}</p>
            </div>
            <img onClick={() => setOpenModal('change-image')} className="cursor-pointer w-20 h-20 rounded-full p-1 ring-2 border-4 border-white ring-gray-300 dark:ring-gray-500 bg-purple-200" src={serverUrl + profile.avatar} alt="" />
            <Modal
              show={openModal === 'change-image'}
              size="md"
              popup
              onClose={() => setOpenModal(undefined)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="flex justify-center space-x-4 py-3">
                  <Button color="gray">
                    Upload Foto
                  </Button>
                  <Button onClick={handleGetAvatars} color="gray">
                    Ganti Avatar
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
            <Modal
              show={openModal === 'change-avatar'}
              size="md"
              popup
              onClose={() => setOpenModal(undefined)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className='mb-5'>
                  <div className='grid grid-cols-6 gap-3 pt-3 mb-5'>
                    {avatars.males.map((e, idx) => (
                      <img key={idx} onClick={() => handleChangeAvatar(e)} className="cursor-pointer w-10 h-10 rounded-full" src={serverUrl + e} alt="Avatar Male" />
                    ))}
                  </div>
                  <div className='grid grid-cols-6 gap-3 pt-3'>
                    {avatars.females.map((e, idx) => (
                      <img key={idx} onClick={() => handleChangeAvatar(e)} className="cursor-pointer w-10 h-10 rounded-full" src={serverUrl + e} alt="Avatar Female" />
                    ))}
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </section>
          <div className="text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faUser} className="w-10" />
              Informasi Akun
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faKey} className="w-10" />
              Ganti Password
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faUnlockKeyhole} className="w-10" />
              Lupa Password
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faCircleQuestion} className="w-10" />
              Bantuan
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faCircleInfo} className="w-10" />
              Tentang
            </button>
            <button
              onClick={() => setOpenModal('confirm-logout')}
              className="relative text-red-500 inline-flex items-center w-full px-5 py-5 rounded-b-lg hover:bg-red-100 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faRightFromBracket} className="w-10" />
              Keluar
            </button>
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
          </div>
        </main>
      </MainLayout>
    </>
  )
}

export default Profile