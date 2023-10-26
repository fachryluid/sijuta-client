import DosenLayout from "../../layouts/DosenLayout"
import { Card } from 'flowbite-react';
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import { Link } from "react-router-dom"
import Alert from '../../components/Alert';

const DosenDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const [dataProfile, setDataProfile] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const { data } = await axios.get(`/dosen/profile`)
      setDataProfile(data.data)
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message, color: 'failure' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DosenLayout>
        <Card className="w-full">
          <h5 className="text-lg text-green-500 font-bold">Selamat datang! Anda masuk sebagai:</h5>
          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">Nama</dt>
              <dd className="font-semibold">{dataProfile.name}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">NIDN</dt>
              <dd className="font-semibold">{dataProfile.lecturer?.nidn}</dd>
            </div>
          </dl>
        </Card>
      </DosenLayout>
    </>
  )
}

export default DosenDashboard
