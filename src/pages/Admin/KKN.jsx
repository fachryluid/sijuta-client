import { Button, Modal, Table } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import { Link } from "react-router-dom"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import Alert from '../../components/Alert';

const KKN = () => {
  const [openModal, setOpenModal] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const [dataMagang, setDataMagang] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const { data } = await axios.get(`/admin/fieldwork?type=KKN`)
      setDataMagang(data.data)
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message, color: 'failure' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (uuid) => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`/admin/fieldwork/${uuid}`)
      getData()
      setOpenModal(undefined)
      setShowAlert({ show: true, message: res.data.message, color: 'success' })
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
          <h1 className="text-2xl">Kuliah Kerja Nyata</h1>
          <Link to="create">
            <Button className="bg-main-0">
              Tambah
            </Button>
          </Link>
        </div>
        {showAlert.show && <Alert color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Nama
            </Table.HeadCell>
            <Table.HeadCell>
              Periode
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Aksi
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataMagang.map((e, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {e.name}
                </Table.Cell>
                <Table.Cell>
                  {e.periode}
                </Table.Cell>
                <Table.Cell className="flex space-x-2.5">
                  <Link to={`${e.uuid}`} className="font-bold text-main-0 hover:underline">
                    Detail
                  </Link>
                  <button onClick={() => setOpenModal(`delete-${e.uuid}`)} className="font-bold text-red-500 hover:underline">
                    Hapus
                  </button>
                  <Modal
                    show={openModal === `delete-${e.uuid}`}
                    size="md"
                    popup
                    onClose={() => setOpenModal(undefined)}
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Konfirmasi Hapus data "{e.name} Periode {e.periode}"
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button color="failure" onClick={() => handleDelete(e.uuid)}>
                            Ya, Hapus
                          </Button>
                          <Button color="gray" onClick={() => setOpenModal(undefined)}>
                            Batal
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AdminLayout>
    </>
  )
}

export default KKN
