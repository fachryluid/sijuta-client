import { Badge, Button, Card } from "flowbite-react"
import AdminLayout from "../../../layouts/AdminLayout"
import { Link, useParams } from "react-router-dom"
import { FIELDWORK_STATUS, FIELDWORK_TYPE } from "../../../utils/constants"
import swr from "../../../utils/swr"
import MainTable from "../../../components/Main/MainTable"
import { useState } from "react"
import FormDelete from "../../../components/Form/FormDelete"
import axios from "../../../utils/axios"
import { toast } from "react-toastify"
import { mutate } from "swr"

export default function FieldworkIndex() {
  const { fieldworkType } = useParams()
  const fieldworkUrl = `/admin/fieldwork?type=${FIELDWORK_TYPE[fieldworkType.toUpperCase()]}`
  const { data: fielworkData, isLoading: fielworkIsLoading } = swr(fieldworkUrl)
  const [openModal, setOpenModal] = useState(undefined)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <>
      <AdminLayout
        isLoading={fielworkIsLoading}
        title={FIELDWORK_TYPE[fieldworkType.toUpperCase()]}
      >
        <Card>
          <Link to={`/administrator/fieldwork/${fieldworkType}/create`}>
            <Button className="bg-main-0 font-bold" size="sm">
              Tambah Data
            </Button>
          </Link>
          <MainTable
            columns={['Nama', 'Periode', 'Kelompok', 'Status', 'Aksi']}
            items={fielworkData?.data?.map(item => ([
              item.name,
              item.periode,
              item.groupCount,
              <Badge className="w-fit" color={item.status == FIELDWORK_STATUS.ACTIVE ? 'success' : 'failure'}>{item.status}</Badge>,
              <div className="flex space-x-2.5">
                <Link to={`/administrator/fieldwork/${fieldworkType}/${item.uuid}/detail`} className="font-bold text-main-0 hover:underline">
                  Detail
                </Link>
                <Link to={`/administrator/fieldwork/${fieldworkType}/${item.uuid}/edit`} className="font-bold text-green-500 hover:underline">
                  Edit
                </Link>
                <FormDelete
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
                />
              </div>
            ]))}
          />
        </Card>
      </AdminLayout>
    </>
  )
}
