import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { Badge, Button, Card, Dropdown, FileInput } from "flowbite-react";
import { Formik, Form, ErrorMessage } from "formik";
import { FIELDWORK_STATUS } from "../../../utils/constants";
import { toast } from "react-toastify";
import { validateGroupsImport } from "../../../utils/validation";
import FormButton from "../../../components/Form/FormSubmit";
import axios from "../../../utils/axios"
import swr from "../../../utils/swr";
import { useState } from "react";
import MainModal from "../../../components/Main/MainModal";
import { mutate } from "swr";
import MainTable from "../../../components/Main/MainTable";
import { HiChevronDown } from "react-icons/hi";

export default function FieldworkDetail() {
  const { fieldworkId, fieldworkType } = useParams()
  const { data: fieldworkData, isLoading: fieldworkIsLoading } = swr(`/admin/fieldwork/${fieldworkId}`)
  const { data: groupsData, isLoading: groupsIsLoading } = swr(`/admin/groups/${fieldworkId}`)
  const [openModal, setOpenModal] = useState(undefined)
  const navigate = useNavigate()

  console.log(fieldworkData)
  console.log(groupsData)

  return (
    <AdminLayout
      title={"Detail " + fieldworkData?.data?.name}
      isLoading={fieldworkIsLoading && groupsIsLoading}
    >
      <Card>
        <div className="flex gap-3">
          <Dropdown
            dismissOnClick={false}
            renderTrigger={() =>
              <Button size="sm" className="bg-main-0 flex items-center font-bold">
                Kelompok
                <HiChevronDown size={20} className="ms-2" />
              </Button>
            }
          >
            <Dropdown.Item onClick={() => navigate(`/administrator/fieldwork/${fieldworkType}/${fieldworkId}/create-group`)}>Tambah</Dropdown.Item>
            <Dropdown.Item onClick={() => setOpenModal('import-groups')}>Import</Dropdown.Item>
          </Dropdown>
          <MainModal
            id="import-groups"
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <Formik
              initialValues={{ file: '' }}
              validate={validateGroupsImport}
              onSubmit={async (values, actions) => {
                try {
                  const formData = new FormData();
                  formData.append('fieldworkUuid', fieldworkId)
                  formData.append('file', values.file)

                  const { data: response } = await axios.post(`admin/groups/import`, formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    }
                  })

                  actions.resetForm()
                  setOpenModal(undefined)
                  mutate(`/admin/groups/${fieldworkId}`)
                  toast.success(response.message)
                } catch (error) {
                  toast.error(error.response?.data?.message || error.message)
                } finally {
                  actions.setSubmitting(false);
                }
              }}
            >
              {(props) => (
                <Form>
                  <div className="mb-5">
                    <FileInput
                      name="file"
                      id="file"
                      onChange={(event) => {
                        props.setFieldValue("file", event.target.files[0]);
                      }}
                    />
                    <ErrorMessage component="small" name="file" className="text-red-500" />
                  </div>
                  <FormButton
                    isSubmitting={props.isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </MainModal>
        </div>
        <dl className="grid grid-cols-4 text-gray-900 divide-x divide-gray-200 dark:text-white dark:divide-gray-700 mb-5">
          <div className="flex flex-col">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Nama</dt>
            <dd className="font-semibold">{fieldworkData?.data?.name}</dd>
          </div>
          <div className="flex flex-col pl-5">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Periode</dt>
            <dd className="font-semibold">{fieldworkData?.data?.periode}</dd>
          </div>
          <div className="flex flex-col pl-5">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Status</dt>
            <dd className="font-semibold">
              <Badge className="w-fit" color={fieldworkData?.data?.status == FIELDWORK_STATUS.ACTIVE ? 'success' : 'failure'}>{fieldworkData?.data?.status}</Badge>
            </dd>
          </div>
          <div className="flex flex-col pl-5">
            <dt className="mb-1 text-gray-500 dark:text-gray-400">Jumlah</dt>
            <dd className="font-semibold">{groupsData?.data?.length}</dd>
          </div>
        </dl>
        <MainTable
          columns={['NIM', 'Nama', 'Lokasi', 'Pembimbing 1', 'Pembimbing 2', 'Aksi']}
          items={groupsData?.data?.map(item => ([
            <>
              {item.students.map((student, idx) => (
                <div key={idx}>{student.nim}</div>
              ))}
            </>,
            <>
              {item.students.map((student, idx) => (
                <div key={idx}>{student.user.name}</div>
              ))}
            </>,
            item.location,
            item.pembimbing1,
            item.pembimbing2,
            <div className="flex space-x-2.5">
              {/* <Link to={`/administrator/fieldwork/${fieldworkType}/${item.uuid}/show`} className="font-bold text-main-0 hover:underline">
                Detail
              </Link> */}
              {/* <Link to={`/administrator/fieldwork/${fieldworkType}/${item.uuid}/edit`} className="font-bold text-green-500 hover:underline">
                Edit
              </Link> */}
              {/* <FormDelete
                id={item.uuid}
                openModal={openModal}
                setOpenModal={setOpenModal}
                label={`${item.name} Periode ${item.periode}`}
                isLoading={isDeleting}
                onClick={async () => {
                  try {
                    setIsDeleting(true)
                    const { data: response } = await axios.delete(`/admin/fieldwork/${item.uuid}`)
                    setOpenModal(undefined)
                    toast.success(response.message)
                    mutate(fieldworkUrl)
                  } catch (error) {
                    toast.error(error.response?.data?.message || error.message)
                  } finally {
                    setIsDeleting(false)
                  }
                }}
              /> */}
            </div>
          ]))}
        />
      </Card>
    </AdminLayout>
  )
}