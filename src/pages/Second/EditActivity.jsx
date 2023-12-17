import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons'
import SecondLayout from '../../layouts/SecondLayout';
import Alert from '../../components/Alert';
import axios from '../../utils/axios'
import { Link, useParams } from 'react-router-dom';
import fetcher from "../../utils/fetcher"
import useSWR from 'swr'
import { useForm } from "react-hook-form"
import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';

const AddActivity = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const { uuid } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { data: userJournalData, error: userJournalError, isLoading: userJournalIsLoading } = useSWR(`/journal/${uuid}`, fetcher)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      
      const formData = new FormData();
      formData.append('file', selectedFile)
      for (const key in data) {
        formData.append(key, data[key])
      }

      const { data: response } = await axios.patch(`journal/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

      const alertMessage = (
        <span>
          {response.message} <Link className="font-bold" to={`/kegiatan/${response.data.uuid}`}>Lihat</Link>
        </span>
      );

      setShowAlert({ show: true, message: alertMessage, color: 'success' })
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message, color: 'failure' })
    } finally {
      setIsLoading(false)
      window.scrollTo(0, 0)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      const allowedTypes = ["image/svg+xml", "image/png", "image/jpeg", "image/gif"]
      if (!allowedTypes.includes(file.type)) {
        setShowAlert({ show: true, message: 'Jenis file tidak didukung. Pilih file dalam format SVG, PNG, JPG, atau GIF.', color: 'failure' })
        e.target.value = null
        setSelectedFile(null)
        window.scrollTo(0, 0)
        return
      }

      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        setShowAlert({ show: true, message: 'Ukuran file terlalu besar. Maksimal 2MB.', color: 'failure' })
        e.target.value = null
        setSelectedFile(null)
        window.scrollTo(0, 0)
        return
      }

      setSelectedFile(file)
    }
  }

  return (
    <>
      <SecondLayout
        title="Edit Kegiatan"
        backButton={true}
        rightButtonLink="/kegiatan"
        rightButtonIcon={
          <FontAwesomeIcon icon={faPersonCircleCheck} className="w-4 h-4 text-[#fffffe]" />
        }
        isLoading={userJournalIsLoading && isLoading}
      >
        {showAlert.show && <Alert color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}
        <section className="mt-5">
          <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label htmlFor="groupId" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Jenis Kegiatan</label>
              <select
                id="groupId"
                name="groupId"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                disabled={true}
              >
                <option>
                  {userJournalData?.data?.group?.fieldwork?.name} ({userJournalData?.data?.group?.fieldwork?.periode})
                </option>
              </select>
            </div>
            <div className="mb-6">
              <Input type="date" name="date" label="Tanggal" defaultValue={userJournalData?.data?.date} register={register} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="mb-6">
                <Input type="time" name="start" label="Mulai" defaultValue={userJournalData?.data?.start} register={register} />
              </div>
              <div className="mb-6">
                <Input type="time" name="end" label="Selesai" defaultValue={userJournalData?.data?.end} register={register} />
              </div>
            </div>
            <div className="mb-6">
              <Input type="text" name="name" label="Nama Kegiatan" defaultValue={userJournalData?.data?.name} register={register} />
            </div>
            <div className="mb-6">
              <Textarea type="text" name="desc" label="Deskripsi Kegiatan" defaultValue={userJournalData?.data?.desc} register={register} />
            </div>
            <div className="mb-6">
              <Input type="text" name="location" label="Lokasi" defaultValue={userJournalData?.data?.location} register={register} />
            </div>
            <div className="mb-6">
              <Input type="text" name="outcome" label="Capaian" defaultValue={userJournalData?.data?.outcome} register={register} />
            </div>
            <div className="mb-6">
              <Textarea type="text" name="note" label="Keterangan (Opsional)" defaultValue={userJournalData?.data?.note} register={register} />
            </div>
            <div className="flex items-center justify-center w-full mb-6">
              <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                {selectedFile && (
                  <div className="absolute z-0">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview Image"
                      className="w-full opacity-20"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload Dokumentasi</span> atau <i>Drag and Drop</i> disini</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="dokumentasi"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e)}
                />
              </label>
            </div>

            <button type="submit" className="text-white bg-main-0 hover:bg-main-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-main-0 dark:hover:bg-main dark:focus:ring-blue-800">Submit</button>
          </form>
        </section>
      </SecondLayout>
    </>
  )
}

export default AddActivity