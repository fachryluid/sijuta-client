import { Button, Card } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useState } from "react"
import Alert from '../../components/Alert';
import axios from '../../utils/axios'
import { Link } from "react-router-dom";

const KKNCreate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const periodes = ['Ganjil 2023/2024', 'Genap 2023/2024', 'Ganjil 2024/2025', 'Genap 2024/2025', 'Ganjil 2025/2026', 'Genap 2025/2026']

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)

      const payload = {
        name: e.target[0].value,
        type: "KKN",
        periode: e.target[1].value
      }

      const { data } = await axios.post(`/admin/fieldwork`, payload)

      const alertMessage = (
        <span>
          {data.message} <Link className="font-bold" to={`/administrator/kkn/${data.data.uuid}`}>Lihat</Link>
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
          <h1 className="text-2xl">Tambah KKN</h1>
        </div>
        {showAlert.show && <Alert color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
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
                Nama KKN
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group mt-8">
              <label htmlFor="periode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Jenis Pengguna</label>
              <select
                id="periode"
                name="periode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              >
                <option value="" hidden>Pilih Periode</option>
                {periodes.map((periode, idx) => (
                  <option key={idx} value={periode}>
                    {periode}
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

export default KKNCreate
