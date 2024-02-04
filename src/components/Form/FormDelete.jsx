import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function FormDelete({ onClick, label, openModal, setOpenModal, id, isLoading }) {
  return (
    <>
      <button onClick={() => setOpenModal(`delete-${id}`)} className="font-bold text-red-500 hover:underline">
        Hapus
      </button>
      <Modal
        show={openModal === `delete-${id}`}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Konfirmasi Hapus data "{label}"
            </h3>
            <div className="flex justify-center gap-4">
              <Button 
                color="failure"
                onClick={onClick}
                isProcessing={isLoading}
                disabled={isLoading}
              >
                Ya, Hapus
              </Button>
              <Button color="gray" onClick={() => setOpenModal(undefined)}>
                Batal
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}