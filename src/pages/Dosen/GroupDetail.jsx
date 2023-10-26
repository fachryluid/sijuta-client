import { Button, Modal, Table } from "flowbite-react"
import DosenLayout from "../../layouts/DosenLayout"
import { useEffect, useState, useRef, forwardRef } from "react"
import axios from "../../utils/axios"
import { useParams } from "react-router-dom"
import AlertComponent from "../../components/Alert"
import { timeJamMenit } from "../../utils/helper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { useReactToPrint } from 'react-to-print';

const ComponentToPrint = forwardRef(({ dataJournals, dataGroup }, ref) => {
  const tableHeaderStyle = {
    border: '1px solid #000',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  };
  
  const tableCellStyle = {
    border: '1px solid #000',
    padding: '8px',
    textAlign: 'left',
    verticalAlign: 'top',
  };  

  return (
    <div ref={ref} className="p-10">
      <div className="text-center mb-5 text-lg font-bold uppercase">
        <h3>JURNAL INDIVIDU HARIAN</h3>
        <h3>{dataGroup.fieldwork?.name}</h3>
        <h3>UNIVERSITAS NEGERI GORONTALO</h3>
        <h3>{dataGroup.location}</h3>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
        <tr>
            <th style={tableHeaderStyle} colSpan={2}>WAKTU/JAM</th>
            <th style={tableHeaderStyle} colSpan={3}>TUGAS/KEGIATAN</th>
            <th style={tableHeaderStyle} colSpan={2}>EVALUASI PELAKSANAAN</th>
            <th style={tableHeaderStyle} rowSpan={2}>PARAF DPL</th>
          </tr>
          <tr>
            <th style={tableHeaderStyle}>Mulai</th>
            <th style={tableHeaderStyle}>Selesai</th>
            <th style={tableHeaderStyle}>Jenis Kegiatan</th>
            <th style={tableHeaderStyle}>Langkah-langkah Kegiatan</th>
            <th style={tableHeaderStyle}>Lokasi</th>
            <th style={tableHeaderStyle}>Hasil Capaian (%)</th>
            <th style={tableHeaderStyle}>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {dataJournals.map((e, idx) => (
            <tr key={idx}>
              <td style={tableCellStyle}>{timeJamMenit(e.start)}</td>
              <td style={tableCellStyle}>{timeJamMenit(e.end)}</td>
              <td style={tableCellStyle}>{e.name}</td>
              <td style={tableCellStyle}>{e.desc}</td>
              <td style={tableCellStyle}>{e.location}</td>
              <td style={tableCellStyle}>{e.outcome}</td>
              <td style={tableCellStyle}>{e.note == '' ? '-' : e.note}</td>
              <td style={tableCellStyle}>{e.isParaf == 1 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faX} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
})

const GroupDetail = () => {
  const [openModal, setOpenModal] = useState(undefined)
  const [dataJournals, setDataJournals] = useState([])
  const [dataGroup, setDataGroup] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })
  const { groupId } = useParams()

  let componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const { data } = await axios.get(`/dosen/journals/${groupId}`)
      setDataJournals(data.data)
      setDataGroup(data.group)
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  const handleParaf = async () => {
    try {
      await axios.post(`/dosen/paraf`, {
        groupId
      })

    } catch (error) {

    } finally {
      await getData()
      setOpenModal(undefined)
    }
  }

  return (
    <>
      <DosenLayout
        isLoading={isLoading}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Kegiatan Magang</h1>
          <div className="flex space-x-3">
            <Button onClick={handlePrint} className="bg-main-0">Cetak</Button>
            <Button onClick={() => setOpenModal(`paraf-all`)} className="bg-main-0">
              Paraf
            </Button>
          </div>
          <Modal
            show={openModal === 'paraf-all'}
            size="md"
            popup
            onClose={() => setOpenModal(undefined)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <FontAwesomeIcon icon={faCheck} className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-green-200" />
                <h3 className="mb-5 text-lg font-normal text-green-500 dark:text-green-400">
                  Paraf semua?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button className="bg-green-400" onClick={handleParaf}>
                    Paraf
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(undefined)}>
                    Batal
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        {showAlert.show && <AlertComponent color={showAlert.color} onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} className="mb-5" />}

        <div style={{ display: 'none' }}>
          <ComponentToPrint ref={componentRef} dataJournals={dataJournals} dataGroup={dataGroup} />
        </div>

        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Mulai
            </Table.HeadCell>
            <Table.HeadCell>
              Selesai
            </Table.HeadCell>
            <Table.HeadCell>
              Nama Kegiatan
            </Table.HeadCell>
            <Table.HeadCell>
              Deskripsi
            </Table.HeadCell>
            <Table.HeadCell>
              Lokasi
            </Table.HeadCell>
            <Table.HeadCell>
              Capaian
            </Table.HeadCell>
            <Table.HeadCell>
              Keterangan
            </Table.HeadCell>
            <Table.HeadCell>
              Paraf
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataJournals.map((e, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {timeJamMenit(e.start)}
                </Table.Cell>
                <Table.Cell>
                  {timeJamMenit(e.end)}
                </Table.Cell>
                <Table.Cell>
                  {e.name}
                </Table.Cell>
                <Table.Cell>
                  {e.desc}
                </Table.Cell>
                <Table.Cell>
                  {e.location}
                </Table.Cell>
                <Table.Cell>
                  {e.outcome}%
                </Table.Cell>
                <Table.Cell>
                  {e.note}
                </Table.Cell>
                <Table.Cell>
                  {e.isParaf == 1 ? <FontAwesomeIcon icon={faCheck} className="text-green-400" /> : <FontAwesomeIcon icon={faX} className="text-red-400" />}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </DosenLayout>
    </>
  )
}

export default GroupDetail
