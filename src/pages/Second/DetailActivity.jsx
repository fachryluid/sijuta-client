import SecondLayout from '@/layouts/SecondLayout'
import { deleteJournal } from '@/services/journalService'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const DetailActivity = ({ verifyToken }) => {
  const navigate = useNavigate()
  const { uuid } = useParams()
  const [openModal, setOpenModal] = useState(null)
  const { data: journal, isLoading: isLoadingJournal } = useSWR(`/journal/${uuid}`);

  const handleDelete = async (uuid) => {
    toast.promise(new Promise(resolve => resolve(deleteJournal(uuid))),
      {
        pending: 'Menghapus data...',
        success: {
          render({ data }) {
            navigate('/kegiatan')
            window.scrollTo(0, 0)
            return data.message
          }
        },
        error: {
          render({ data }) {
            return data.response?.data?.message || data.message
          }
        }
      }
    )
  }

  return (
    <SecondLayout
      title="Detail Kegiatan"
      backButton={true}
      rightButtonLink={"/kegiatan/" + journal?.data?.uuid + "/edit"}
      rightButtonIcon={
        <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-[#fffffe]" />
      }
      verifyToken={verifyToken}
    >
      <section>
        <div className="flex flex-col space-y-5">
          <div>
            <h2 className="text-lg font-bold mb-3">{journal?.data?.name}</h2>
            <p>{journal?.data?.desc}</p>
          </div>
          <button onClick={() => setOpenModal('image')}>
            <img className="rounded-lg w-full h-52 object-cover border" src={journal?.data?.image} alt="Dokumentasi Kegiatan" />
          </button>
          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">Waktu</dt>
              <dd className="font-semibold">{journal?.data?.start} - {journal?.data?.end}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">Lokasi</dt>
              <dd className="font-semibold">{journal?.data?.location}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">Hasil Capaian</dt>
              <dd className="font-semibold">{journal?.data?.outcome}%</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">Keterangan</dt>
              <dd className="font-semibold">{journal?.data?.note ?? '-'}</dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">Paraf DPL</dt>
              <dd className="font-semibold">
                {journal?.data?.isParaf == 1 ? <span>&#10004;</span> : '-'}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 dark:text-gray-400">Aksi</dt>
              <dd className="flex space-x-2.5">
                <Link to={`/kegiatan/${journal?.data?.uuid}/edit`} className="font-bold text-main-0 hover:underline">
                  Edit
                </Link>
                <button onClick={() => setOpenModal(`delete-${journal?.data?.uuid}`)} className="font-bold text-red-500 hover:underline">
                  Hapus
                </button>
                <Modal
                  show={openModal === `delete-${journal?.data?.uuid}`}
                  size="md"
                  popup
                  onClose={() => setOpenModal(undefined)}
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Konfirmasi Hapus data kegiatan "{journal?.data?.name}"
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => handleDelete(journal?.data?.uuid)}>
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
          <img className="w-full h-auto" src={journal?.data?.image} alt="Dokumentasi Kegiatan" />
        </Modal.Body>
      </Modal>
    </SecondLayout>
  )
}

export default DetailActivity