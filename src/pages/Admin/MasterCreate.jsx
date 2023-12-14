import { Button, Card } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useState } from "react"
import Alert from '../../components/Alert';
import axios from '../../utils/axios'
import { Link } from "react-router-dom";

const MasterCreate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)

      const payload = {
        role: e.target[0].value,
        idNumber: e.target[1].value,
        name: e.target[2].value,
        username: e.target[3].value,
        email: e.target[4].value,
        password: e.target[5].value,
      }

      const { data } = await axios.post(`/admin/master/user`, payload)

      const alertMessage = (
        <span>
          {data.message} <Link className="font-bold" to={`/administrator/master/user/${data.data.uuid}`}>Lihat</Link>
        </span>
      );

      setShowAlert({ show: true, message: alertMessage, color: 'success' })
      e.target.reset()
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message, color: 'failure' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AdminLayout
        isLoading={isLoading}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Tambah Pengguna</h1>
        </div>
        {showAlert.show && <Alert color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}

        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
            <div className="relative z-0 w-full group mt-2">
              <label htmlFor="role" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Jenis Pengguna *
              </label>
              <select
                id="role"
                name="role"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              >
                <option value="" hidden>Pilih Jenis</option>
                <option value="MAHASISWA">MAHASISWA</option>
                <option value="DOSEN">DOSEN</option>
                <option value="ADMINISTRATOR">ADMINISTRATOR</option>
              </select>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="idNumber"
                id="idNumber"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
              />
              <label
                htmlFor="idNumber"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                NIM / NIDN *
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nama Lengkap *
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="username"
                id="username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
              />
              <label
                htmlFor="username"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username *
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <Button type="submit" className="bg-main-0">
              Submit
            </Button>
          </form>
        </Card>
      </AdminLayout>
    </>
  )
}

export default MasterCreate
