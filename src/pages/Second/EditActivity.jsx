import FormInput from '@/components/Form/FormInput';
import FormSelect from '@/components/Form/FormSelect';
import SecondLayout from '@/layouts/SecondLayout';
import { updateJournal } from '@/services/journalService';
import { validationSchemaUpdateJournal } from '@/utils/validation';
import { faPersonCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export default function EditActivity({ verifyToken }) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate()
  const { uuid } = useParams()
  const [selectedFile, setSelectedFile] = useState(null);
  const { data: journal } = useSWR(`/journal/${uuid}`);
  const { data: fieldworks } = useSWR(`/user/${userData?.uuid}/groups`);
  const fieldworkOptions = fieldworks?.data?.map(e => ({ label: e.fieldwork?.name, value: e.uuid }));

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    const fields = ['date', 'start', 'end', 'name', 'desc', 'location', 'outcome', 'note'];
    fields.forEach(field => {
      formData.append(field, values[field]);
    });
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    toast.promise(new Promise(resolve => resolve(updateJournal(uuid, formData))),
      {
        pending: 'Tunggu sebentar...',
        success: {
          render({ data }) {
            actions.resetForm();
            navigate(`/kegiatan/${data.data.uuid}`)
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
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Jenis file tidak didukung. Pilih file dalam format SVG, PNG, JPG, atau GIF.');
        e.target.value = null;
        setSelectedFile(null);

        return;
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('Ukuran file terlalu besar. Maksimal 2MB.');
        e.target.value = null;
        setSelectedFile(null);

        return;
      }

      setSelectedFile(file);
    }
  };

  return (
    <>
      <SecondLayout
        title="Edit Kegiatan"
        backButton={true}
        rightButtonLink="/kegiatan"
        rightButtonIcon={
          <FontAwesomeIcon icon={faPersonCircleCheck} className="w-4 h-4 text-[#fffffe]" />
        }
      >
        <section className="mt-7">
          {journal &&
            <Formik
              initialValues={{
                groupId: journal.data?.group?.uuid,
                date: journal.data?.date,
                start: journal.data?.start,
                end: journal.data?.end,
                name: journal.data?.name,
                desc: journal.data?.desc,
                location: journal.data?.location,
                outcome: journal.data?.outcome,
                note: journal.data?.note,
              }}
              validationSchema={validationSchemaUpdateJournal}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form encType="multipart/form-data">
                  <FormSelect label="Jenis Kegiatan" name="groupId" placeholder="Pilih Kegiatan" options={fieldworkOptions} isDisabled />
                  <FormInput type="date" label="Tanggal" name="date" />
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput type="time" label="Mulai" name="start" />
                    <FormInput type="time" label="Selesai" name="end" />
                  </div>
                  <FormInput name="name" label="Nama Kegiatan" placeholder="Isi Nama Kegiatan" />
                  <FormInput type="textarea" name="desc" label="Deskripsi Kegiatan" placeholder="Isi Deskripsi Kegiatan" />
                  <FormInput name="location" label="Lokasi" placeholder="Isi Lokasi" />
                  <FormInput type="number" name="outcome" label="Capaian" placeholder="Isi Capaian" />
                  <FormInput type="textarea" name="note" label="Keterangan" placeholder="(Opsional)" />
                  <div className="flex items-center justify-center w-full mb-6">
                    <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                      <div className="absolute z-0">
                        <img src={selectedFile ? URL.createObjectURL(selectedFile) : journal.data?.image} alt="Preview Image" className="w-full opacity-20" />
                      </div>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Upload Dokumentasi</span> atau <i>Drag and Drop</i> disini
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                      </div>
                      <input id="dropzone-file" type="file" name="dokumentasi" className="hidden" onChange={(e) => handleFileUpload(e)} />
                    </label>
                  </div>
                  <button type="submit" disabled={props.isSubmitting} className="text-white bg-main-0 hover:bg-main-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-main-0 dark:hover:bg-main dark:focus:ring-blue-800">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          }
        </section>
      </SecondLayout>
    </>
  )
}