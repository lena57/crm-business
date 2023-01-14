import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const UpdateClientModal = ({updateClient, row}) => {

  const [name, setName] = useState(row.name)
  const [address, setAddress] = useState(row.address)
  const [phoneNumber, setPhoneNumber] = useState(row.phoneNumber)

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setName(row.name)
    setAddress(row.address)
    setPhoneNumber(row.phoneNumber)

  };

  const saveButtonHandler = () => {
    const newClient = {
      name, address, phoneNumber
    }
    updateClient(row._id, newClient)
    toggle()
  }

  return (
    <div>
      <Button outline color="primary" onClick={toggle}>Update Client</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Client</ModalHeader>
        <ModalBody>
          Client name:
          <Input value={name} onChange={(e) =>
            setName(e.target.value)}></Input>
          <br/>
          Address:
          <Input value={address}
                 onChange={(e) => setAddress(e.target.value)}></Input>
          <br/>
          Phone Number:
          <Input value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}></Input>

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={saveButtonHandler}>
            Save
          </Button>
          <Button color="warning" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateClientModal;
