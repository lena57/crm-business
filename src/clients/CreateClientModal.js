import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const CreateClientModal = ({addClient}) => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [createAt, setCreateAt] = useState('')


  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setName('')
    setAddress('')
    setPhoneNumber('')
    setCreateAt('')
  };

  const saveButtonHandler = () => {
    const newClient = {
      name, address, phoneNumber, createAt
    }
    addClient(newClient)
    toggle()
  }

  return (
    <div>
      <Button outline color="success" onClick={toggle}>Add Client</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Client</ModalHeader>
        <ModalBody>
          <Input type="text" placeholder="client name" value={name} onChange={(e) =>
            setName(e.target.value)}></Input>
          <br/>
          <Input type="text" placeholder="address" value={address}
                 onChange={(e) => setAddress(e.target.value)}></Input>
          <br/>

          <Input type="tel" placeholder="phone number" value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}></Input>
          <br/>
          <Input type="date" placeholder="create at" value={createAt}
                  onChange={(e) => setCreateAt(e.target.value)}>
          </Input>

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

export default CreateClientModal;
