import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from './../../utils/axios'
import Alert from '../../components/Alert';
import AuthLayout from '../../layouts/AuthLayout';
import CryptoJS from 'crypto-js';
import { randomString } from '../../utils/generate';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    password: ''
  })
  const [roles, setRoles] = useState([])
  const [getIsLoading, setIsLoading] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get('/roles')
      setRoles(data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const handleLogin = async (e) => {
    // try {
    //   e.preventDefault()
    //   setIsLoading(true)

    //   const { data } = await axios.post('/auth/login', {
    //     role: formData.role,
    //     username: formData.username,
    //     password: formData.password
    //   })

    //   const token = data.data.token
    //   const user = data.data.user

    //   const key = `${user.uuid}-${user.username}`
    //   const encryptedToken = CryptoJS.AES.encrypt(token, key).toString();

    //   localStorage.setItem('userData', JSON.stringify(user));
    //   localStorage.setItem('accessToken', encodeURIComponent(encryptedToken));

    //   navigate(data.data.redirect)
    // } catch (error) {
    //   setShowAlertMessage(error.response?.data?.message || error.message)
    //   setShowAlert(true)
    // } finally {
    //   setIsLoading(false)
    // }

    try {
      e.preventDefault()
      setIsLoading(prevState => [...prevState, 'handle-login']);

      const payload = {
        role: formData.role,
        username: formData.username,
        password: formData.password
      }

      toast.promise(new Promise(resolve => resolve(axios.post('/auth/login', payload))),
        {
          pending: 'Tunggu Sebentar...',
          success: {
            render({ data }) {
              const token = data.data.data.token
              const user = data.data.data.user

              const key = `${user.uuid}-${user.username}`
              const encryptedToken = CryptoJS.AES.encrypt(token, key).toString();

              localStorage.setItem('userData', JSON.stringify(user));
              localStorage.setItem('accessToken', encodeURIComponent(encryptedToken));

              navigate(data.data.data.redirect)
              return data.data.message
            }
          },
          error: {
            render({ data }) {
              return data.response?.data?.message || data.message
            }
          }
        }
      )
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setIsLoading(prevState => prevState.filter(item => item !== 'handle-login'));
    }

  }

  return (
    <>
      <AuthLayout>
        <div className="mb-3 text-center text-gray-700">
          <h1 className="text-2xl font-bold">LOGIN</h1>
          <h4>Sistem Informasi Jurnal Kegiatan MBKM</h4>
        </div>
        <form onSubmit={handleLogin}>
          <div className="relative z-0 w-full mb-6 group mt-8">
            <label htmlFor="role" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Jenis Pengguna</label>
            <select
              id="role"
              name="role"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              value={formData.role}
            >
              <option value="" hidden>Pilih Pengguna</option>
              {roles.map((e, idx) => (
                <option key={idx} value={e.role}>
                  {e.role}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              placeholder=""
              autoComplete="username"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username {formData.role === 'MAHASISWA' ? '/ NIM' : (formData.role === 'DOSEN' ? '/ NIDN' : '')}
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              placeholder=""
              autoComplete="current-password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border text-main-0 bg-gray-100 border-gray-300 rounded focus:ring-main-0 dark:focus:ring-main-0 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ingat Saya</label>
              </div>
            </div>
            <Link to="/lupa-password" className="text-sm font-medium text-main-0 hover:underline dark:text-primary-500">Lupa password?</Link>
          </div>
          <button type="submit" className="text-white bg-main-0 hover:bg-main-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-main-0 dark:hover:bg-main dark:focus:ring-blue-800 mb-3">Submit</button>
        </form>
      </AuthLayout>
    </>
  )
}

export default Login