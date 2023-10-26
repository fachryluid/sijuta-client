import { Table } from "flowbite-react"
import DosenLayout from "../../layouts/DosenLayout"
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import { Link } from "react-router-dom"
import Alert from '../../components/Alert';

const Groups = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const [dataGroups, setDataGroups] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const { data } = await axios.get(`/dosen/groups`)
      setDataGroups(data.data)
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message, color: 'failure' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DosenLayout
        isLoading={isLoading}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Kelompok</h1>
        </div>
        {showAlert.show && <Alert color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Jenis
            </Table.HeadCell>
            <Table.HeadCell>
              Periode
            </Table.HeadCell>
            <Table.HeadCell>
              Lokasi
            </Table.HeadCell>
            <Table.HeadCell>
              Anggota
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Aksi
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataGroups.map((e, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {e.fieldwork.name}
                </Table.Cell>
                <Table.Cell>
                  {e.fieldwork.periode}
                </Table.Cell>
                <Table.Cell>
                  {e.location}
                </Table.Cell>
                <Table.Cell>
                  {e.students.map((student, idx) => (
                    <div key={idx}>{student.user.name}</div>
                  ))}
                </Table.Cell>
                <Table.Cell className="flex space-x-2.5">
                  <Link to={`${e.uuid}`} className="font-bold text-main-0 hover:underline">
                    Detail
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </DosenLayout>
    </>
  )
}

export default Groups
