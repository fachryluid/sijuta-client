import { Button, Card } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useState } from "react"
import Alert from '../../components/Alert';
import axios from '../../utils/axios'
import { Link } from "react-router-dom";
import fetcher from "../../utils/fetcher"
import useSWR from 'swr'

const MagangCreateGroup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const periodes = ['Ganjil 2023/2024', 'Genap 2023/2024', 'Ganjil 2024/2025', 'Genap 2024/2025', 'Ganjil 2025/2026', 'Genap 2025/2026']

  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/admin/master`, fetcher)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)

      const payload = {
        location: e.target[0].value,
        pembimbing1: e.target[1].value,
        pembimbing2: e.target[2].value
      }

      return console.log(payload);

      const { data } = await axios.post(`/admin/fieldwork`, payload)

      const alertMessage = (
        <span>
          {data.message} <Link className="font-bold" to={`/administrator/magang/${data.data.uuid}`}>Lihat</Link>
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
        isLoading={userIsLoading}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Tambah Kelompok Magang</h1>
        </div>
        {showAlert.show && <Alert color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
            <div className="relative z-0 w-full group mt-8">
              <label htmlFor="mahasiswa1" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Mahasiswa 1
              </label>
              <select
                id="mahasiswa1"
                name="mahasiswa1"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              >
                <option value="" hidden>Pilih Mahasiswa 1</option>
                {userData?.data?.students.map((student, idx) => (
                  <option key={idx} value={student.user.id}>
                    {student.user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="location"
                id="location"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
              />
              <label
                htmlFor="location"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Lokasi
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="pembimbing1" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Pembimbing 1
              </label>
              <select
                id="pembimbing1"
                name="pembimbing1"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              >
                <option value="" hidden>Pilih Pembimbing 1</option>
                {userData?.data?.lecturers.map((dosen, idx) => (
                  <option key={idx} value={dosen.user.id}>
                    {dosen.user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group mt-8">
              <label htmlFor="pembimbing2" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Pembimbing 2
              </label>
              <select
                id="pembimbing2"
                name="pembimbing2"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              >
                <option value="" hidden>Pilih Pembimbing 2</option>
                {userData?.data?.lecturers.map((dosen, idx) => (
                  <option key={idx} value={dosen.user.id}>
                    {dosen.user.name}
                  </option>
                ))}
              </select>
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

export default MagangCreateGroup
