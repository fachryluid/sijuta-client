import AdminLayout from "../../layouts/AdminLayout"
import { useState } from "react"
import fetcher from "../../utils/fetcher"
import { useParams } from "react-router-dom"
import AlertComponent from "../../components/Alert"
import useSWR from 'swr'

const MasterDetail = ({ verifyToken }) => {
  const { role, uuid } = useParams()
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })

  const { data: userData, error: userError, isLoading: userIsLoading } = useSWR(`/admin/master/user?role=${role.toUpperCase()}&uuid=${uuid}`, fetcher)

  return (
    <>
      <AdminLayout
        verifyToken={verifyToken}
        isLoading={userIsLoading}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Detail Pengguna</h1>
        </div>
        {showAlert.show && <AlertComponent color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}

        <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
          <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Nama Lengkap</dt>
            <dd className="font-semibold">{userData?.data?.name}</dd>
          </div>
          <div className="flex flex-col py-3">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Username</dt>
            <dd className="font-semibold">{userData?.data?.username}</dd>
          </div>
          <div className="flex flex-col pt-3">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="font-semibold">{userData?.data?.email ?? '-'}</dd>
          </div>
        </dl>

      </AdminLayout>
    </>
  )
}

export default MasterDetail
