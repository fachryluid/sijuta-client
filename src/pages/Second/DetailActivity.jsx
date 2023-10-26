import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import SecondLayout from '../../layouts/SecondLayout'
import Alert from '../../components/Alert'
import axios from '../../utils/axios'
import { useParams } from 'react-router-dom'
import { Modal } from 'flowbite-react'

const DetailActivity = ({ verifyToken }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setShowAlertMessage] = useState(null)
  const [journal, setJournal] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(null)
  const { uuid } = useParams()

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

  return (
    <>
      <SecondLayout
        title="Detail Kegiatan"
        backButton={true}
        rightButtonLink={"/kegiatan/"+journal.uuid+"/edit"}
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