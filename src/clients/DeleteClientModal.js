import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const DeleteClientModal = ({deleteClient, row}) => {

  const [name, setName] = useState('')

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setName('')

  };

  const saveButtonHandler = () => {
    deleteClient(row._id)
    toggle()
  }

  return (
    <div>
      <Button outline color="danger" onClick={toggle}>Delete Client</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete Client</ModalHeader>
        <ModalBody>
          <p> This action cannot be undo. This will be permanently delete the {' '}
            <b>{row.name}</b> {' '}</p>
          <p>Please type <b>{row.name}</b> to confirm</p>
          Client name:
          <Input value={name} onChange={(e) =>
            setName(e.target.value)}></Input>


        </ModalBody>
        <ModalFooter>
          <Button color="success" disabled={row.name !== name} onClick={saveButtonHandler}>
            Yes
          </Button>
          <Button color="warning" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteClientModal;
