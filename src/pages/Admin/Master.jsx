import { Button, Table } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import Alert from '../../components/Alert';

const Master = () => {
  const [openModal, setOpenModal] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const [dataStudents, setDataStudents] = useState([])
  const [dataLecturers, setDataLecturers] = useState([])
  const [dataAdministrators, setDataAdministrators] = useState([])
  const [activeTab, setActiveTab] = useState('Mahasiswa');

  useEffect(() => {
    getData()
  }, [])

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(`/admin/master`)
      setDataStudents(data.data.students)
      setDataLecturers(data.data.lecturers)
      setDataAdministrators(data.data.administrators)
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
          <h1 className="text-2xl">Master Data</h1>
        </div>
        {showAlert.show && <Alert color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}

        <div>
          <div className="tab-buttons text-lg mb-5">
            <button
              className={activeTab === 'Mahasiswa' ? 'active border-b-2 border-main-0 py-2 px-5' : 'py-2 px-5'}
              onClick={() => handleTabClick('Mahasiswa')}
            >
              Mahasiswa
            </button>
            <button
              className={activeTab === 'Dosen' ? 'active border-b-2 border-main-0 py-2 px-5' : 'py-2 px-5'}
              onClick={() => handleTabClick('Dosen')}
            >
              Dosen
            </button>
            <button
              className={activeTab === 'Admin' ? 'active border-b-2 border-main-0 py-2 px-5' : 'py-2 px-5'}
              onClick={() => handleTabClick('Admin')}
            >
              Admin
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'Mahasiswa' && <>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>
                    NIM
                  </Table.HeadCell>
                  <Table.HeadCell>
                    NAMA
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dataStudents.map((e, idx) => (
                    <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {e.nim}
                      </Table.Cell>
                      <Table.Cell>
                        {e.user.name}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>}
            {activeTab === 'Dosen' && <>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>
                    NIDN
                  </Table.HeadCell>
                  <Table.HeadCell>
                    NAMA
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dataLecturers.map((e, idx) => (
                    <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {e.nidn}
                      </Table.Cell>
                      <Table.Cell>
                        {e.user.name}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>}
            {activeTab === 'Admin' && <>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>
                    Username
                  </Table.HeadCell>
                  <Table.HeadCell>
                    NAMA
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dataAdministrators.map((e, idx) => (
                    <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {e.user.username}
                      </Table.Cell>
                      <Table.Cell>
                        {e.user.name}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>}
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Master
