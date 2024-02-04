import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import SecondLayout from '../../layouts/SecondLayout'
import Alert from '../../components/Alert'
import axios from '../../utils/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const DetailActivity = ({ verifyToken }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setShowAlertMessage] = useState(null)
  const [journal, setJournal] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(null)
  const { uuid } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getJournal()
  }, [])

  const getJournal = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`/journal/${uuid}`)
      setJournal(data.data)
    } catch (error) {
      setShowAlertMessage(error.response?.data?.message || error.message)
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (uuid) => {
    try {
      setIsLoading(true)
      await axios.delete(`/journal/${uuid}`)

      navigate('/kegiatan')
    } catch (error) {
      setShowAlertMessage(error.response?.data?.message || error.message)
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SecondLayout
        title="Detail Kegiatan"
        backButton={true}
        rightButtonLink={"/kegiatan/" + journal.uuid + "/edit"}
        rightButtonIcon={
          <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-[#fffffe]" />
        }
        verifyToken={verifyToken}
        isLoading={isLoading}
      >
        {showAlert && <Alert color="failure" onDismiss={() => setShowAlert(false)} alertMessage={alertMessage} />}
        <section className="mt-10">
          <div className="flex flex-col space-y-5">
            <div>
              <h2 className="text-lg font-bold mb-3">{journal.name}</h2>
              <p>{journal.desc}</p>
            </div>
            <button onClick={() => setOpenModal('image')}>
              <img className="rounded-lg w-full h-52 object-cover border" src={journal.image} alt="Dokumentasi Kegiatan" />
            </button>
            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 dark:text-gray-400">Waktu</dt>
                <dd className="font-semibold">{journal.start} - {journal.end}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 dark:text-gray-400">Lokasi</dt>
                <dd className="font-semibold">{journal.location}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 dark:text-gray-400">Hasil Capaian</dt>
                <dd className="font-semibold">{journal.outcome}%</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 dark:text-gray-400">Keterangan</dt>
                <dd className="font-semibold">{journal.note ?? '-'}</dd>
              </div>
              <div className="flex flex-col pt-3">
                <dt className="mb-1 text-gray-500 dark:text-gray-400">Paraf DPL</dt>
                <dd className="font-semibold">-</dd>
              </div>
              <div className="flex flex-col pt-3">
                <dt className="mb-1 text-gray-500 dark:text-gray-400">Aksi</dt>
                <dd className="flex space-x-2.5">
                  <Link to={`/kegiatan/${journal.uuid}/edit`} className="font-bold text-main-0 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => setOpenModal(`delete-${journal.uuid}`)} className="font-bold text-red-500 hover:underline">
                    Hapus
                  </button>
                  <Modal
                    show={openModal === `delete-${journal.uuid}`}
                    size="md"
                    popup
                    onClose={() => setOpenModal(undefined)}
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Konfirmasi Hapus data kegiatan "{journal.name}"
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button color="failure" onClick={() => handleDelete(journal.uuid)}>
                            Ya, Hapus
                          </Button>
                          <Button color="gray" onClick={() => setOpenModal(undefined)}>
                            Batal
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <Modal
          show={openModal === 'image'}
          size="md"
          popup
          onClose={() => setOpenModal(null)}
        >
          <Modal.Header>
            <span className="text-base font-bold py-1 pl-4">Dokumentasi</span>
          </Modal.Header>
          <Modal.Body>
            <img className="w-full h-auto" src={journal.image} alt="Dokumentasi Kegiatan" />
          </Modal.Body>
        </Modal>
      </SecondLayout>
    </>
  )
}

export default DetailActivity