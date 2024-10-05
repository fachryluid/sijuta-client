import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { Card } from "flowbite-react";
import swr from "../../../utils/swr";
import MainTable from "../../../components/Main/MainTable";
import ListVertical from "../../../components/List/ListVertical";

export default function GroupDetail() {
  const { uuid } = useParams()

  const { data: groupData, isLoading: groupIsLoading } = swr(`/admin/groups/${uuid}`)

  return (
    <AdminLayout
      title="Detail Kelompok"
      isLoading={groupIsLoading}
    >
      <Card>
        <ListVertical
          items={[
            {
              label: 'Kegiatan',
              value: `${groupData?.data?.fieldwork?.name} (${groupData?.data?.fieldwork?.periode})`
            },
            {
              label: 'Lokasi',
              value: groupData?.data?.location
            },
            {
              label: 'Pembimbing 1',
              value: groupData?.data?.pembimbing1?.user?.name ?? '-'
            },
            {
              label: 'Pembimbing 2',
              value: groupData?.data?.pembimbing2?.user?.name ?? '-'
            },
            {
              label: 'Pembimbing 3',
              value: groupData?.data?.pembimbing3?.user?.name ?? '-'
            },
            {
              label: 'Anggota',
              value: <MainTable
                columns={['NIM', 'Nama', 'Aksi']}
                items={groupData?.data?.students?.map(item => ([
                  item.nim,
                  item.user?.name,
                  <div className="flex space-x-2.5">
                    <Link to={`/administrator/group/${uuid}/member/${item.user?.uuid}`} className="font-bold text-main-0 hover:underline">
                      Jurnal
                    </Link>
                  </div>
                ]))}
              />
            },
          ]}
        />
      </Card>
    </AdminLayout>
  )
}