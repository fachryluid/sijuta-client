import { Button, Modal } from "flowbite-react";

export default function MainModal({ openModal, setOpenModal, children, label, id }) {
  return (
    <>
      {label &&
        <Button onClick={() => setOpenModal(id)} className="bg-main-0" size="sm">
          {label}
        </Button>
      }
      <Modal
        show={openModal === id}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  )
}