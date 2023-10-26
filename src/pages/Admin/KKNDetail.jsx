import { Button, Modal, Table } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import { Link, useParams } from "react-router-dom"
import AlertComponent from "../../components/Alert"

const KKNDetail = () => {
  const [openModal, setOpenModal] = useState(undefined)
  const [dataGroups, setDataGroups] = useState([])
  const [dataFieldwork, setDataFieldwork] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const { fieldworkId } = useParams()

  useEffect(() => {
    try {
      getData()
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }, [])

  const getData = async () => {
    const { data } = await axios.get(`/admin/groups/${fieldworkId}`)
    const fieldwork = await axios.get(`/admin/fieldwork/${fieldworkId}`)
    setDataFieldwork(fieldwork.data.data)
    setDataGroups(data.data)
  }

  const handleImport = async (e) => {
    try {
      e.preventDefault()

      setIsLoading(true)
      setOpenModal(undefined)

      const file = e.target[0].files[0]
      const formData = new FormData();
      formData.append('fieldworkUuid', fieldworkId)
      formData.append('file', file)

      const resGroupImport = await axios.post('admin/groups/import', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

      setShowAlert({ show: true, message: resGroupImport.data.message, color: 'success' })
    } catch (error) {
      console.log(error)
      setShowAlert({ show: true, message: error.response?.data?.message || error.message, color: 'failure' })
    } finally {
      getData()
      setIsLoading(false)
    }
  };

  return (
    <>
      <AdminLayout
        isLoading={isLoading}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Kelompok KKN</h1>
          <Button onClick={() => setOpenModal(`import-groups`)} className="bg-main-0">
            Import
          </Button>
          <Modal
            show={openModal === `import-groups`}
            size="md"
            popup
            onClose={() => setOpenModal(undefined)}
          >
            <Modal.Header />
            <Modal.Body>
              <form encType="multipart/form-data" onSubmit={handleImport}>
                <div className="mb-5">
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-300 text-end">.xlsx (max. 2mb).</p>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_import_groups" id="file_groups" type="file" />
                </div>
                <div className="text-center">
                  <div className="flex justify-center gap-4">
                    <Button type="submit" className="bg-main-0">
                      Import
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(undefined)}>
                      Batal
                    </Button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
        {showAlert.show && <AlertComponent color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}
        <dl className="grid grid-cols-2 text-gray-900 divide-x divide-gray-200 dark:text-white dark:divide-gray-700 mb-5">
          <div className="flex flex-col">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Nama</dt>
            <dd className="font-semibold">{dataFieldwork.name}</dd>
          </div>
          <div className="flex flex-col pl-5">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Periode</dt>
            <dd className="font-semibold">{dataFieldwork.periode}</dd>
          </div>
        </dl>

        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              NIM
            </Table.HeadCell>
            <Table.HeadCell>
              Nama
            </Table.HeadCell>
            <Table.HeadCell>
              Lokasi
            </Table.HeadCell>
            <Table.HeadCell>
              Pembimbing 1
            </Table.HeadCell>
            <Table.HeadCell>
              Pembimbing 2
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataGroups.map((e, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {e.students.map((student, idx) => (
                    <div key={idx}>{student.nim}</div>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {e.students.map((student, idx) => (
                    <div key={idx}>{student.user.name}</div>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {e.location}
                </Table.Cell>
                <Table.Cell>
                  {e.pembimbing1}
                </Table.Cell>
                <Table.Cell>
                  {e.pembimbing2}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AdminLayout>
    </>
  )
}

export default KKNDetail
